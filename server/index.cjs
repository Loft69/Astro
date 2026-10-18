const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {store, hashPassword, verifyPassword, publicUser} = require("./db");

const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, "..", "dist");

function json(res, status, body) {
    res.writeHead(status, {"Content-Type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(body));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let raw = "";
        req.on("data", chunk => {
            raw += chunk;
            if (raw.length > 1e6) reject(new Error("Слишком большой запрос"));
        });
        req.on("end", () => {
            if (!raw) return resolve({});
            try { resolve(JSON.parse(raw)); } catch { reject(new Error("Невалидный JSON")); }
        });
        req.on("error", reject);
    });
}

function authUser(req) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return null;
    return store.getUserByToken(token);
}

async function handleApi(req, res, url) {
    const method = req.method;
    const route = url.pathname;

    if (route === "/api/auth/register" && method === "POST") {
        const b = await readBody(req);
        const firstName = String(b.firstName || "").trim();
        const lastName = String(b.lastName || "").trim();
        const email = String(b.email || "").trim().toLowerCase();
        const password = String(b.password || "");

        if (!firstName || !lastName || !email || !password)
            return json(res, 400, {error: "Заполните все обязательные поля"});
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
            return json(res, 400, {error: "Некорректный email"});
        if (password.length < 6)
            return json(res, 400, {error: "Пароль должен быть не короче 6 символов"});
        if (store.getUserByEmail(email))
            return json(res, 409, {error: "Пользователь с таким email уже существует"});

        const user = store.createUser({
            firstName, lastName, email,
            passwordHash: hashPassword(password),
            birthday: b.birthday || "", preferences: b.preferences || "",
            createdAt: new Date().toISOString(),
        });
        const token = crypto.randomBytes(32).toString("hex");
        store.createSession(token, user.id);
        return json(res, 201, {token, user: publicUser(user)});
    }

    if (route === "/api/auth/login" && method === "POST") {
        const b = await readBody(req);
        const email = String(b.email || "").trim().toLowerCase();
        const user = store.getUserByEmail(email);
        if (!user || !verifyPassword(b.password || "", user.passwordHash))
            return json(res, 401, {error: "Неверный email или пароль"});
        const token = crypto.randomBytes(32).toString("hex");
        store.createSession(token, user.id);
        return json(res, 200, {token, user: publicUser(user)});
    }

    if (route === "/api/auth/me" && method === "GET") {
        const user = authUser(req);
        if (!user) return json(res, 401, {error: "Не авторизован"});
        return json(res, 200, {user: publicUser(user)});
    }

    if (route === "/api/auth/logout" && method === "POST") {
        const header = req.headers.authorization || "";
        if (header.startsWith("Bearer ")) store.deleteSession(header.slice(7));
        return json(res, 200, {ok: true});
    }

    if (route === "/api/orders" && method === "GET") {
        const user = authUser(req);
        if (!user) return json(res, 401, {error: "Не авторизован"});
        return json(res, 200, {orders: store.getOrdersByUser(user.id)});
    }

    if (route === "/api/orders" && method === "POST") {
        const user = authUser(req);
        if (!user) return json(res, 401, {error: "Не авторизован"});
        const b = await readBody(req);
        const items = Array.isArray(b.items) ? b.items : [];
        if (!items.length) return json(res, 400, {error: "Корзина пуста"});
        const total = items.reduce((s, i) => s + Number(i.price) * Number(i.quantity || 1), 0);

        const count = store.getOrdersByUser(user.id).length + 1;
        const order = store.createOrder({
            userId: user.id,
            number: `ASTRO-${String(user.id).padStart(3, "0")}-${String(count).padStart(3, "0")}`,
            items: items.map(i => ({id: i.id, name: i.name, size: i.size, price: i.price, quantity: i.quantity})),
            total: total.toFixed(2),
            status: "В обработке",
            createdAt: new Date().toISOString(),
        });
        return json(res, 201, {order});
    }

    if (route === "/api/health" && method === "GET") {
        return json(res, 200, {ok: true, db: store.kind});
    }

    return json(res, 404, {error: "Маршрут не найден"});
}

/* ---------------------- Раздача собранного фронта (dist) ---------------------- */
function serveStatic(req, res, url) {
    let filePath = path.join(DIST_DIR, decodeURIComponent(url.pathname));
    if (!filePath.startsWith(DIST_DIR)) { res.writeHead(403); return res.end(); }
    if (url.pathname === "/" || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, "index.html");
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = {".html": "text/html", ".js": "text/javascript", ".css": "text/css",
        ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".ico": "image/x-icon"};
    try {
        res.writeHead(200, {"Content-Type": types[ext] || "application/octet-stream"});
        fs.createReadStream(filePath).pipe(res);
    } catch {
        res.writeHead(404); res.end("Not found");
    }
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.end();

    try {
        if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
        if (fs.existsSync(DIST_DIR)) return serveStatic(req, res, url);
        return json(res, 200, {ok: true, hint: "API жив. Фронт: npm run dev (vite)"});
    } catch (e) {
        return json(res, 500, {error: e.message || "Внутренняя ошибка сервера"});
    }
});

server.listen(PORT, () => {
    console.log(`ASTRO API: http://localhost:${PORT}`);
});