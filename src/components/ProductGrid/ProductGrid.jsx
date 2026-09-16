import ProductCard from "../ProductCard/ProductCard";
import React from "react";


export default function ProductGrid({products}) {
    if (!products.length) return <div className="empty-state">Товары не найдены</div>;
    return <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>;
}