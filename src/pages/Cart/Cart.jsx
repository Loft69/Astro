import {Link} from "react-router-dom";
import {useCart} from "../../context/CartContext";
import React from "react";

export default function Cart() {
    const {cart, totalPrice, changeQuantity, removeFromCart, clearCart} = useCart();

    if (!cart.length) return <div className="page">
        <div className="container empty-cart"><span className="eyebrow">ASTRO</span><h1>Корзина пуста</h1><p>Добавьте
            товары из каталога, чтобы оформить заказ.</p><Link to="/catalog" className="button button--dark">Перейти в
            каталог</Link></div>
    </div>;

    return (
        <div className="page">
            <div className="container">
                <div className="page-heading"><span className="eyebrow">ASTRO STORE</span><h1>Корзина</h1></div>
                <div className="cart">
                    <div className="cart__items">{cart.map(item => <div className="cart-item"
                                                                        key={`${item.id}-${item.size}`}>
                        <img src={item.image} alt={item.name}/>
                        <div className="cart-item__info"><h3>{item.name}</h3><p>Размер: {item.size}</p>
                            <strong>{Number(item.price).toLocaleString("ru-RU")} ₽</strong></div>
                        <div className="quantity">
                            <button onClick={() => changeQuantity(item.id, item.size, item.quantity - 1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => changeQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                        </div>
                        <button className="remove" onClick={() => removeFromCart(item.id, item.size)}>Удалить</button>
                    </div>)}</div>
                    <aside className="cart__summary"><h2>Итого</h2>
                        <div><span>Товары</span><strong>{totalPrice.toLocaleString("ru-RU")} ₽</strong></div>
                        <div><span>Доставка</span><strong>Бесплатно</strong></div>
                        <hr/>
                        <div><span>Всего</span><strong>{totalPrice.toLocaleString("ru-RU")} ₽</strong></div>
                        <button className="button button--dark button--full"
                                onClick={() => alert("Заказ оформлен!")}>Оформить заказ
                        </button>
                        <button className="clear-cart" onClick={clearCart}>Очистить корзину</button>
                    </aside>
                </div>
            </div>
        </div>
    );
}