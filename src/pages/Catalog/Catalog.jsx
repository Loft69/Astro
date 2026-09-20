import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { initialProducts } from '../../mock/products';
import { Product } from '../../models/Product';

export default function Catalog() {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);

    const [params, setParams] = useSearchParams();
    const category = params.get("category") || "all";
    const [size, setSize] = useState("all");
    const [color, setColor] = useState("all");

    // 1. Извлекаем уникальные фильтры из текущего списка продуктов
    const availableCategories = useMemo(() => Product.getUniqueCategories(products), [products]);
    const availableSizes = useMemo(() => Product.getUniqueSizes(products), [products]);
    const availableColors = useMemo(() => Product.getUniqueColors(products), [products]);

    // 2. Защитная проверка: если выбран фильтр, которого больше нет в базе, сбрасываем его в "all"
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

    // 3. Изменение категории с обновлением URL
    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        if (newCat === "all") {
            params.delete("category");
        } else {
            params.set("category", newCat);
        }
        setParams(params);
    };

    // 4. Отфильтрованный массив товаров
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

                        {/* Динамические категории */}
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

                        {/* Динамические размеры */}
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

                        {/* Динамические цвета */}
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