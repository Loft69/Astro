import React, {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext(null);

export function CartProvider({children}) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("astro-cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("astro-cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product, size = "M") {
        setCart(current => {
            const existing = current.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return current.map(item =>
                    item.id === product.id && item.size === size
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            }
            return [...current, {...product, size, quantity: 1}];
        });
    }

    function removeFromCart(id, size) {
        setCart(current => current.filter(item => !(item.id === id && item.size === size)));
    }

    function changeQuantity(id, size, quantity) {
        if (quantity <= 0) return removeFromCart(id, size);
        setCart(current =>
            current.map(item =>
                item.id === id && item.size === size ? {...item, quantity} : item
            )
        );
    }

    function clearCart() {
        setCart([]);
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{cart, addToCart, removeFromCart, changeQuantity, clearCart, totalItems, totalPrice}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}