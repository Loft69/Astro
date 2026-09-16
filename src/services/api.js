const API_URL = "https://6aaaa668ff4dd5698b4ee18e.mockapi.io/api/v1";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error("Не удалось загрузить товары");
    return response.json();
}

export async function getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Товар не найден");
    return response.json();
}

export async function createUser(user) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error("Не удалось зарегистрировать пользователя");
    return response.json();
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Не удалось загрузить пользователей");
    return response.json();
}