import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useCart} from "../../context/CartContext";
import React from "react";

export default function Profile() {
    const {user, logout} = useAuth();
    const {cart} = useCart();

    if (!user) return <div className="page">
        <div className="container empty-state"><h1>Вы не авторизованы</h1><Link to="/login"
                                                                                className="button button--dark">Войти</Link>
        </div>
    </div>;

    return <div className="page">
        <div className="container">
            <div className="page-heading"><span className="eyebrow">ASTRO ACCOUNT</span><h1>Личный кабинет</h1></div>
            <div className="profile">
                <section className="profile-card"><h2>Профиль</h2>
                    <div className="profile-avatar">{user.firstName?.charAt(0)}</div>
                    <p><strong>Имя:</strong> {user.firstName}</p><p><strong>Фамилия:</strong> {user.lastName}</p><p>
                        <strong>Email:</strong> {user.email}</p>{user.birthday &&
                        <p><strong>Дата рождения:</strong> {user.birthday}</p>}
                    <button className="button button--outline" onClick={logout}>Выйти</button>
                </section>
                <section className="profile-card"><h2>Мои заказы</h2>
                    <div className="order">
                        <div><strong>Заказ #ASTRO-001</strong><p>{cart.length || 2} товара</p></div>
                        <span className="status">Выполнен</span></div>
                    <div className="order">
                        <div><strong>Заказ #ASTRO-002</strong><p>1 товар</p></div>
                        <span className="status status--pending">В обработке</span></div>
                </section>
                <section className="profile-card"><h2>Список желаний</h2><p>Здесь будут товары, которые вы добавили в
                    избранное.</p></section>
            </div>
        </div>
    </div>;
}