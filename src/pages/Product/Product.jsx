import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { initialProducts } from "../../mock/products";
import { resolveColor, colorLabel } from "../../utils/colors";
import {useTheme} from "../../context/ThemeContext.jsx";
import { getProduct, normalizeProduct } from "../../services/api";

export default function Product() {
    const { id } = useParams();
    const { cart, addToCart, changeQuantity, removeFromCart } = useCart();
    const { theme } = useTheme();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState(
        product?.sizes?.length > 0 ? product.sizes[0] : "M"
    );

    const [selectedColor, setSelectedColor] = useState(() => {
        if (!product?.colors || product.colors.length === 0) return null;
        const white = product.colors.find((c) => c.toLowerCase() === "white");
        return white || product.colors[0];
    });

    useEffect(() => {
        let alive = true;
        getProduct(id)
            .then(p => alive && setProduct(normalizeProduct(p)))
            .catch(() => alive && setProduct(initialProducts.find(p => String(p.id) === String(id)) || null))
            .finally(() => alive && setLoading(false));
        return () => { alive = false; };
    }, [id]);

    useEffect(() => {
        if (!product) return;
        setSelectedSize(product.sizes?.length ? product.sizes[0] : "M");
        const white = product.colors?.find(c => c.toLowerCase() === "white");
        setSelectedColor(product.colors?.length ? (white || product.colors[0]) : null);
    }, [product]);

    if (loading) return <div className="page"><div className="container loading">Загрузка товара…</div></div>;

    if (!product) {
        return (
            <div className="page">
                <div className="container not-found">
                    <h1>404</h1>
                    <p>Такого товара нет в каталоге — возможно, он был снят с продажи.</p>
                    <Link to="/catalog" className="button button--dark">
                        Вернуться в каталог
                    </Link>
                </div>
            </div>
        );
    }

    const cartItem = cart.find(
        (item) => item.id === product.id && item.size === selectedSize
    );
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => addToCart(product, selectedSize);

    const handleIncrement = () =>
        changeQuantity(product.id, selectedSize, quantity + 1);

    const handleDecrement = () => {
        if (quantity > 1) {
            changeQuantity(product.id, selectedSize, quantity - 1);
        } else {
            removeFromCart(product.id, selectedSize);
        }
    };

    const priceText = `${Number(product.price).toLocaleString("ru-RU")} ₽`;
    const displaySizes = product.sizes?.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL"];

    return (
        <div className="page">
            <div className="container">
                {/* Хлебные крошки */}
                <nav className="breadcrumbs">
                    <Link to="/catalog">Каталог</Link>
                    <span>/</span>
                    <Link to={`/catalog?category=${encodeURIComponent(product.category.toLowerCase())}`}>
                        {product.category}
                    </Link>
                    <span>/</span>
                    <span className="breadcrumbs__current">{product.name}</span>
                </nav>

                <div className="product-page">
                    <div className="product-page__image">
                        <span className="product-page__badge">{product.category}</span>
                        <img src={product.image?.startsWith("http") ? product.image : `/assets/${product.image}`} alt={product.name} />
                    </div>

                    <div className="product-page__info">
                        <span className="eyebrow">ASTRO · {product.category}</span>
                        <h1>{product.name}</h1>
                        <div className="product-page__price">{priceText}</div>
                        <p>
                            {product.description ||
                                "Современная модель ASTRO из новой коллекции. Комфортный крой и качественные материалы."}
                        </p>

                        {/* Цвет */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="product-option">
                                <h4>
                                    Цвет
                                    <span className="product-option__value">{colorLabel(selectedColor)}</span>
                                </h4>
                                <div className="colors-list colors-list--lg">
                                    {product.colors.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            className={`color-swatch color-swatch--lg ${selectedColor === c ? "active" : ""}`}
                                            style={{ backgroundColor: resolveColor(c) }}
                                            onClick={() => setSelectedColor(c)}
                                            title={colorLabel(c)}
                                            aria-label={colorLabel(c)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Размер */}
                        <div className="product-option">
                            <h4>Размер</h4>
                            <div className="sizes">
                                {displaySizes.map((item) => (
                                    <button
                                        key={item}
                                        className={selectedSize === item ? "size active" : "size"}
                                        onClick={() => setSelectedSize(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Кнопка добавления / степпер количества */}
                        {quantity === 0 ? (
                            <button
                                className="button button--dark button--full"
                                onClick={handleAddToCart}
                            >
                                Добавить в корзину
                            </button>
                        ) : (
                            <div className="product-page__quantity">
                                <div className="quantity-controls quantity-controls--lg">
                                    <button
                                        className="btn-quantity"
                                        onClick={handleDecrement}
                                        // disabled={quantity <= 1}
                                        title={quantity <= 1 ? "Удалить" : "Уменьшить"}
                                    >
                                        {quantity <= 1 ? (
                                            <img src="../../../public/assets/trash.svg" alt="Удалить" style={{ filter: theme === "dark" ? 'invert(1)' : 'none' }} />
                                        ) : (
                                            "−"
                                        )}
                                    </button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button className="btn-quantity" onClick={handleIncrement} title="Увеличить">
                                        +
                                    </button>
                                </div>
                                <span className="product-page__in-cart">В корзине: {quantity} шт.</span>
                            </div>
                        )}

                        {/* Преимущества */}
                        <div className="product-perks">
                            <div className="perk">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                    <path d="M3 16V6a1 1 0 0 1 1-1h10v11" />
                                    <path d="M14 9h4l3 3v4h-7" />
                                    <circle cx="7.5" cy="17.5" r="1.7" />
                                    <circle cx="17.5" cy="17.5" r="1.7" />
                                </svg>
                                <span>Доставка 2–4 дня</span>
                            </div>
                            <div className="perk">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                    <path d="M4 4v6h6" />
                                    <path d="M20 12a8 8 0 1 1-3-6.3" />
                                </svg>
                                <span>Возврат в течение 30 дней</span>
                            </div>
                            <div className="perk">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
                                </svg>
                                <span>Гарантия качества</span>
                            </div>
                        </div>

                        <div className="product-details">
                            <div>
                                <span>Состав</span>
                                <strong>100% хлопок</strong>
                            </div>
                            <div>
                                <span>Уход</span>
                                <strong>Машинная стирка 30°</strong>
                            </div>
                            <div>
                                <span>Категория</span>
                                <strong>{product.category}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}