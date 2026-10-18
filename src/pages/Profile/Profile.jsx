import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {fetchOrders} from "../../services/api";
import React from "react";

export default function Profile() {
    const {user, logout} = useAuth();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (user) fetchOrders().then(({orders}) => setOrders(orders)).catch(() => setOrders([]));
    }, [user]);

    if (!user) return <div className="page">
        <div className="container empty-state"><h1>Вы не авторизованы</h1>
            <Link to="/login" className="button button--dark">Войти</Link></div>
    </div>;

    return <div className="page">
        <div className="container">
            <div className="page-heading"><span className="eyebrow">ASTRO ACCOUNT</span><h1>Личный кабинет</h1></div>
            <div className="profile">
                <section className="profile-card"><h2>Профиль</h2>
                    <div className="profile-avatar">{user.firstName?.charAt(0)}</div>
                    <p><strong>Имя:</strong> {user.firstName}</p>
                    <p><strong>Фамилия:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.birthday && <p><strong>Дата рождения:</strong> {user.birthday}</p>}
                    {user.createdAt && <p><strong>В ASTRO с:</strong> {new Date(user.createdAt).toLocaleDateString("ru-RU")}</p>}
                    <button className="button button--outline" onClick={logout}>Выйти</button>
                </section>
                <section className="profile-card"><h2>Мои заказы</h2>
                    {orders === null && <p>Загрузка…</p>}
                    {orders?.length === 0 && <p>Заказов пока нет — загляните в <Link to="/catalog">каталог</Link>.</p>}
                    {orders?.map(o => (
                        <div className="order" key={o.id}>
                            <div>
                                <strong>Заказ #{o.number}</strong>
                                <p>{o.items.reduce((s, i) => s + i.quantity, 0)} товар(а) · {Number(o.total).toLocaleString("ru-RU")} ₽ · {new Date(o.createdAt).toLocaleDateString("ru-RU")}</p>
                            </div>
                            <span className={`status ${o.status === "Выполнен" ? "" : "status--pending"}`}>{o.status}</span>
                        </div>
                    ))}
                </section>
                <section className="profile-card"><h2>Список желаний</h2>
                    <p>Здесь будут товары, которые вы добавили в избранное.</p></section>
            </div>
        </div>
    </div>;
}