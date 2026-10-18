import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { initialProducts } from '../../mock/products';
import { Product } from '../../models/Product';
import { getProducts, normalizeProduct } from "../../services/api";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [params, setParams] = useSearchParams();
    const category = params.get("category") || "all";
    const [size, setSize] = useState("all");
    const [color, setColor] = useState("all");

    const availableCategories = useMemo(() => Product.getUniqueCategories(products), [products]);
    const availableSizes = useMemo(() => Product.getUniqueSizes(products), [products]);
    const availableColors = useMemo(() => Product.getUniqueColors(products), [products]);

    useEffect(() => {
        let alive = true;
        getProducts()
            .then(list => {
                const normalized = list.map(normalizeProduct);
                // Создаём экземпляры класса Product из нормализованных данных
                const productInstances = normalized.map(data => new Product(data));
                alive && setProducts(productInstances);
            })
            .catch(() => alive && setProducts(initialProducts)) // офлайн-фолбэк
            .finally(() => alive && setLoading(false));
        return () => { alive = false; };
    }, []);

    useEffect(() => {
        if (size !== "all" && !availableSizes.includes(size)) {
            setSize("all");
        }
        if (color !== "all" && !availableColors.includes(color)) {
            setColor("all");
        }
        if (category !== "all" && !availableCategories.some(c => c.toLowerCase() === category.toLowerCase())) {
            params.delete("category");
            setParams(params);
        }
    }, [products, availableCategories, availableSizes, availableColors, size, color, category, params, setParams]);

    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        if (newCat === "all") {
            params.delete("category");
        } else {
            params.set("category", newCat);
        }
        setParams(params);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => product.matches({ category, size, color }));
    }, [products, category, size, color]);

    return (
        <div className="page">
            <div className="container">
                <div className="page-heading">
                    <span className="eyebrow">ASTRO STORE</span>
                    <h1>Каталог</h1>
                </div>
                <div className="catalog">
                    <div className="filters">
                        <h3>Фильтры</h3>
                        <label>
                            Категория
                            <select value={category} onChange={handleCategoryChange}>
                                <option value="all">Все</option>
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat.toLowerCase()}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Размер
                            <select value={size} onChange={e => setSize(e.target.value)}>
                                <option value="all">Все</option>
                                {availableSizes.map(sz => (
                                    <option key={sz} value={sz}>
                                        {sz}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Цвет
                            <select value={color} onChange={e => setColor(e.target.value)}>
                                <option value="all">Все</option>
                                {availableColors.map(col => (
                                    <option key={col} value={col.toLowerCase()}>
                                        {col}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="catalog__content">
                        {loading ? (
                            <div className="loading">Загрузка товаров...</div>
                        ) : (
                            <ProductGrid products={filteredProducts}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}