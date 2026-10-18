const MOCK_API_URL = "https://6aaaa668ff4dd5698b4ee18e.mockapi.io/api/v1";

const LOCAL_API = "/api";

async function request(url, options = {}) {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Ошибка запроса (${res.status})`);
    return data;
}

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("astro-token")}` });

export async function getProducts() {
    return request(`${MOCK_API_URL}/products`);
}

export async function getProduct(id) {
    return request(`${MOCK_API_URL}/products/${id}`);
}

export function normalizeProduct(p) {
    return {
        id: String(p.id),
        name: p.name ?? "Товар",
        description: p.description ?? "",
        category: p.category ?? "Разное",
        price: p.price ?? 0,
        image: p.image ?? "",
        sizes: Array.isArray(p.sizes) && p.sizes.length ? p.sizes : ["XS", "S", "M", "L", "XL"],
        colors: Array.isArray(p.colors) && p.colors.length ? p.colors : ["black", "white"],
    };
}

export const registerUser = (data) =>
    request(`${LOCAL_API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

export const loginUser = (data) =>
    request(`${LOCAL_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

export const fetchMe = () =>
    request(`${LOCAL_API}/auth/me`, { headers: authHeader() });

export const logoutUser = () =>
    request(`${LOCAL_API}/auth/logout`, { method: "POST", headers: authHeader() });

export const fetchOrders = () =>
    request(`${LOCAL_API}/orders`, { headers: authHeader() });

export const createOrder = (items) =>
    request(`${LOCAL_API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ items }),
    });