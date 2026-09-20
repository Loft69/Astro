import {Link} from "react-router-dom";
import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__grid">
                <div>
                    <div className="footer__logo">ASTRO</div>
                    <p>Современная одежда для тех, кто создаёт собственный стиль.</p>
                </div>
                <div>
                    <h4>Навигация</h4>
                    <Link to="/catalog">Каталог</Link>
                    <Link to="/about">О нас</Link>
                    <Link to="/contacts">Контакты</Link>
                </div>
                <div>
                    <h4>Помощь</h4>
                    <Link to="/cart">Корзина</Link>
                    <Link to="/profile">Личный кабинет</Link>
                    <Link to="/login">Войти</Link>
                </div>
                <div>
                    <h4>Контакты</h4>
                    <p>+7 (900) 000-00-00</p>
                    <p>hello@astro.ru</p>
                </div>
            </div>
            <div className="footer__bottom">© 2026 ASTRO. Все права защищены.</div>
        </footer>
    );
}