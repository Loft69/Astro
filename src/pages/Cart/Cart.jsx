import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useCart} from "../../context/CartContext";
import {useAuth} from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal/AuthModal";

export default function Cart() {
    const {cart, totalPrice, changeQuantity, removeFromCart, clearCart} = useCart();
    const {user} = useAuth();
    const [authOpen, setAuthOpen] = useState(false);
    const [orderDone, setOrderDone] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

    if (orderDone) {
        return (
            <div className="page">
                <div className="container order-success">
                    <div className="order-success__icon">✓</div>
                    <span className="eyebrow">ASTRO STORE</span>
                    <h1>Заказ оформлен!</h1>
                    <p>
                        Спасибо за покупку{user?.firstName ? `, ${user.firstName}` : ""}.
                        Подтверждение отправлено на {user?.email}.
                    </p>
                    <Link to="/catalog" className="button button--dark">Вернуться в каталог</Link>
                </div>
            </div>
        );
    }

    if (!cart.length) {
        return (
            <div className="page">
                <div className="container empty-cart">
                    <span className="eyebrow">ASTRO</span>
                    <h1>Корзина пуста</h1>
                    <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
                    <Link to="/catalog" className="button button--dark">Перейти в каталог</Link>
                </div>
            </div>
        );
    }

    function checkout() {
        if (!user) return setAuthOpen(true);
        clearCart();
        setOrderDone(true);
    }

    function completeAfterAuth() {
        setAuthOpen(false);
        clearCart();
        setOrderDone(true);
    }

    return (
        <div className="page">
            <div className="container">
                <div className="page-heading">
                    <span className="eyebrow">ASTRO STORE</span>
                    <h1>
                        Корзина
                        <span className="cart-count">{totalItems}</span>
                    </h1>
                </div>

                <div className="cart">
                    <div className="cart__items">
                        {cart.map(item => (
                            <article className="cart-item" key={`${item.id}-${item.size}`}>
                                <Link to={`/product/${item.id}`} className="cart-item__image">
                                    <img src={item.image} alt={item.name}/>
                                </Link>

                                <div className="cart-item__info">
                                    <Link to={`/product/${item.id}`} className="cart-item__name">
                                        {item.name}
                                    </Link>
                                    <div className="cart-item__meta">
                                        <span>Размер: <strong>{item.size}</strong></span>
                                        <span>Цена: <strong>{Number(item.price).toLocaleString("ru-RU")} ₽</strong></span>
                                    </div>
                                </div>

                                <div className="quantity">
                                    <button type="button"
                                            onClick={() => changeQuantity(item.id, item.size, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            aria-label="Уменьшить">−</button>
                                    <span>{item.quantity}</span>
                                    <button type="button"
                                            onClick={() => changeQuantity(item.id, item.size, item.quantity + 1)}
                                            aria-label="Увеличить">+</button>
                                </div>

                                <div className="cart-item__sum">
                                    {(Number(item.price) * item.quantity).toLocaleString("ru-RU")} ₽
                                </div>

                                <button type="button"
                                        className="cart-item__remove"
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        aria-label="Удалить">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="1.8"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                    </svg>
                                </button>
                            </article>
                        ))}

                        <button type="button" className="clear-cart"
                                onClick={() => setConfirmClear(true)}>
                            Очистить корзину
                        </button>
                    </div>

                    <aside className="cart__summary">
                        <h2>Итого</h2>
                        <div>
                            <span>Товары ({totalItems})</span>
                            <strong>{totalPrice.toLocaleString("ru-RU")} ₽</strong>
                        </div>
                        <div>
                            <span>Доставка</span>
                            <strong>Бесплатно</strong>
                        </div>
                        <hr/>
                        <div className="cart__total">
                            <span>Всего</span>
                            <strong>{totalPrice.toLocaleString("ru-RU")} ₽</strong>
                        </div>
                        <button className="button button--dark button--full" onClick={checkout}>
                            Оформить заказ
                        </button>
                        {!user && (
                            <p className="cart__hint">
                                Для оформления заказа потребуется войти в аккаунт
                            </p>
                        )}
                    </aside>
                </div>
            </div>

            <AuthModal
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                onSuccess={completeAfterAuth}
                message="Войдите или создайте аккаунт, чтобы оформить заказ"
            />

            {confirmClear && (
                <div className="modal-overlay"
                     onMouseDown={e => e.target === e.currentTarget && setConfirmClear(false)}>
                    <div className="modal modal--small" role="dialog" aria-modal="true">
                        <h2>Очистить корзину?</h2>
                        <p>Все товары будут удалены без возможности восстановления.</p>
                        <div className="modal__actions">
                            <button type="button" className="button button--outline"
                                    onClick={() => setConfirmClear(false)}>Отмена</button>
                            <button type="button" className="button button--dark"
                                    onClick={() => {clearCart(); setConfirmClear(false);}}>
                                Очистить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}