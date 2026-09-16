import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import React from "react";

export default function Header() {
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="container header__inner">
                <Link to="/" className="logo">ASTRO</Link>
                <nav className="nav">
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/catalog">Каталог</NavLink>
                    <NavLink to="/about">О нас</NavLink>
                    <NavLink to="/contacts">Контакты</NavLink>
                </nav>
                <div className="header__actions">
                    {/* Кнопка переключения темы */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Переключить тему"
                        title={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>

                    {user ? (
                        <div className="header__user">
                            <Link to="/profile">{user.firstName}</Link>
                            <button onClick={logout}>Выйти</button>
                        </div>
                    ) : (
                        <Link to="/login" className="header__login">Войти</Link>
                    )}

                    <Link to="/cart" className="cart-button">
                        Корзина {totalItems > 0 && <span>{totalItems}</span>}
                    </Link>
                </div>
            </div>
        </header>
    );
}