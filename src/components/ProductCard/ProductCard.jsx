import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
    const { cart, addToCart, changeQuantity } = useCart();

    // Если у продукта есть размеры, берем первый по умолчанию, иначе "M"
    const [selectedSize, setSelectedSize] = useState(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M"
    );

    // Находим этот конкретный товар с выбранным размером в корзине
    const cartItem = cart.find(
        (item) => item.id === product.id && item.size === selectedSize
    );
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        addToCart(product, selectedSize);
    };

    const handleIncrement = () => {
        changeQuantity(product.id, selectedSize, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            changeQuantity(product.id, selectedSize, quantity - 1);
        }
    };

    // Форматированная цена из метода класса Product или fallback
    const priceText = typeof product.getFormattedPrice === "function"
        ? product.getFormattedPrice()
        : `${Number(product.price).toLocaleString("ru-RU")} ₽`;

    return (
        <article className="product-card">
            {/* Картинка и бейджи */}
            <div className="product-card__image-wrapper">
                <Link to={`/product/${product.id}`}>
                    <img className="product-card__image" src={product.image} alt={product.name} />
                </Link>
                <div className="product-card__badges">
                    {product.category && <span className="badge badge--category">{product.category}</span>}
                    {product.color && <span className="badge badge--color">{product.color}</span>}
                </div>
            </div>

            {/* Контент карточки */}
            <div className="product-card__content">
                <div className="product-card__header">
                    <Link to={`/product/${product.id}`} className="product-card__title-link">
                        <h3 className="product-card__title">{product.name}</h3>
                    </Link>
                    {product.description && (
                        <p className="product-card__description">{product.description}</p>
                    )}
                </div>

                {/* Выбор размера */}
                {product.sizes && product.sizes.length > 0 && (
                    <div className="product-card__sizes">
                        <span className="sizes-label">Размер:</span>
                        <div className="sizes-list">
                            {product.sizes.map((sz) => (
                                <button
                                    key={sz}
                                    type="button"
                                    className={`size-chip ${selectedSize === sz ? "active" : ""}`}
                                    onClick={() => setSelectedSize(sz)}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Нижняя часть: цена и анимация кнопки */}
                <div className="product-card__bottom">
                    <div className="product-card__price">{priceText}</div>

                    <div className="product-card__action">
                        {quantity === 0 ? (
                            <button
                                className="btn-add-to-cart"
                                onClick={handleAddToCart}
                            >
                                В корзину
                            </button>
                        ) : (
                            <div className="quantity-controls">
                                <button
                                    className="btn-quantity btn-quantity--minus"
                                    onClick={handleDecrement}
                                    disabled={quantity <= 1}
                                    title={quantity <= 1 ? "Минимальное количество — 1" : "Уменьшить"}
                                >
                                    −
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    className="btn-quantity btn-quantity--plus"
                                    onClick={handleIncrement}
                                    title="Увеличить"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}