import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProduct} from "../../services/api";
import {useCart} from "../../context/CartContext";
import React from "react";

export default function Product() {
    const {id} = useParams();
    const {addToCart} = useCart();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("M");

    useEffect(() => {
        getProduct(id).then(setProduct).catch(() => setProduct(null));
    }, [id]);

    if (!product) return <div className="page">
        <div className="container empty-state">Товар не найден</div>
    </div>;

    return (
        <div className="page">
            <div className="container">
                <div className="product-page">
                    <div className="product-page__image"><img src={product.image} alt={product.name}/></div>
                    <div className="product-page__info">
                        <span className="eyebrow">{product.category}</span>
                        <h1>{product.name}</h1>
                        <div className="product-page__price">{Number(product.price).toLocaleString("ru-RU")} ₽</div>
                        <p>{product.description || "Современная модель ASTRO из новой коллекции. Комфортный крой и качественные материалы."}</p>
                        <div className="product-option"><h4>Размер</h4>
                            <div className="sizes">
                                {["XS", "S", "M", "L", "XL"].map(item => <button key={item}
                                                                                 className={size === item ? "size active" : "size"}
                                                                                 onClick={() => setSize(item)}>{item}</button>)}
                            </div>
                        </div>
                        <button className="button button--dark button--full"
                                onClick={() => addToCart(product, size)}>Добавить в корзину
                        </button>
                        <div className="product-details">
                            <div>
                                <span>Состав</span>
                                <strong>100% хлопок</strong>
                            </div>
                            <div>
                                <span>Уход</span>
                                <strong>Машинная стирка 30°</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}