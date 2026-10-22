import {useState} from "react";
import {CartContext} from "./CartContext.jsx";

export const CartProvider = ({ children }) => {
    const byItemProductId = (productId) => {
        return (item) => item.id === productId;
    }

    const [cart, setCart] = useState([]);
    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(byItemProductId(product.id));
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => setCart([]);

    const getCantidadActual = (productId) => {
        const item = cart.find(byItemProductId(productId));
        return item ? item.quantity : 0;
    };

    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    const isInCart = (productId) => {
        return cart.some(byItemProductId(productId));
    };

    const getCartQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

    const getCartTotal = () => cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart,
            getCartQuantity, getCartTotal, getCantidadActual,
            removeItem, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};