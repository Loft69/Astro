const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "astro.db.json");

function createSqliteStore() {
    const {DatabaseSync} = require("node:sqlite");
    const db = new DatabaseSync(path.join(__dirname, "astro.db"));

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            passwordHash TEXT NOT NULL,
            birthday TEXT DEFAULT '',
            preferences TEXT DEFAULT '',
            createdAt TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            userId INTEGER NOT NULL,
            createdAt TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            number TEXT NOT NULL,
            items TEXT NOT NULL,
            total TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'В обработке',
            createdAt TEXT NOT NULL
        );
    `);

    const stmt = {
        userByEmail: db.prepare("SELECT * FROM users WHERE email = ?"),
        userById: db.prepare("SELECT * FROM users WHERE id = ?"),
        insertUser: db.prepare(`INSERT INTO users (firstName, lastName, email, passwordHash, birthday, preferences, createdAt)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`),
        insertSession: db.prepare("INSERT INTO sessions (token, userId, createdAt) VALUES (?, ?, ?)"),
        userByToken: db.prepare(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.userId WHERE s.token = ?`),
        deleteSession: db.prepare("DELETE FROM sessions WHERE token = ?"),
        insertOrder: db.prepare(`INSERT INTO orders (userId, number, items, total, status, createdAt)
                                 VALUES (?, ?, ?, ?, ?, ?)`),
        ordersByUser: db.prepare("SELECT * FROM orders WHERE userId = ? ORDER BY id DESC"),
    };

    return {
        kind: "sqlite",
        getUserByEmail: (email) => stmt.userByEmail.get(email),
        getUserById: (id) => stmt.userById.get(id),
        createUser(u) {
            const info = stmt.insertUser.run(u.firstName, u.lastName, u.email, u.passwordHash, u.birthday || "", u.preferences || "", u.createdAt);
            return stmt.userById.get(Number(info.lastInsertRowid));
        },
        createSession(token, userId) { stmt.insertSession.run(token, userId, new Date().toISOString()); },
        getUserByToken: (token) => stmt.userByToken.get(token),
        deleteSession: (token) => stmt.deleteSession.run(token),
        createOrder(order) {
            const info = stmt.insertOrder.run(order.userId, order.number, JSON.stringify(order.items), String(order.total), order.status, order.createdAt);
            return {...order, id: Number(info.lastInsertRowid)};
        },
        getOrdersByUser: (userId) => stmt.ordersByUser.all(userId).map(o => ({...o, items: JSON.parse(o.items)})),
    };
}

function createJsonStore() {
    let data = {users: [], sessions: [], orders: []};
    if (fs.existsSync(DB_PATH)) {
        try { data = JSON.parse(fs.readFileSync(DB_PATH, "utf8")); } catch { /* повреждённый файл — начинаем заново */ }
    }
    const save = () => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    const nextId = (arr) => arr.reduce((m, x) => Math.max(m, x.id), 0) + 1;

    return {
        kind: "json-file",
        getUserByEmail: (email) => data.users.find(u => u.email === email),
        getUserById: (id) => data.users.find(u => u.id === id),
        createUser(u) {
            const user = {...u, id: nextId(data.users)};
            data.users.push(user); save();
            return user;
        },
        createSession(token, userId) { data.sessions.push({token, userId, createdAt: new Date().toISOString()}); save(); },
        getUserByToken(token) {
            const s = data.sessions.find(x => x.token === token);
            return s && data.users.find(u => u.id === s.userId);
        },
        deleteSession(token) { data.sessions = data.sessions.filter(x => x.token !== token); save(); },
        createOrder(order) {
            const full = {...order, id: nextId(data.orders)};
            data.orders.push(full); save();
            return full;
        },
        getOrdersByUser: (userId) => data.orders.filter(o => o.userId === userId).sort((a, b) => b.id - a.id),
    };
}

let store;
try {
    store = createSqliteStore();
    console.log("[db] драйвер: SQLite (astro.db)");
} catch (e) {
    store = createJsonStore();
    console.log("[db] драйвер: JSON-файл (astro.db.json)");
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
    const [salt, hash] = String(stored).split(":");
    if (!salt || !hash) return false;
    const candidate = crypto.scryptSync(password, salt, 64);
    const original = Buffer.from(hash, "hex");
    return candidate.length === original.length && crypto.timingSafeEqual(candidate, original);
}

function publicUser(u) {
    if (!u) return null;
    const {passwordHash, ...rest} = u;
    return rest;
}

module.exports = {store, hashPassword, verifyPassword, publicUser};