import {useCart} from "../../context/useCart.js";
import {Link} from "react-router-dom";

const Cart = () => {
    // 2. Obtenemos el estado 'cart' y las funciones que necesitemos del contexto
    const { cart, clearCart, getCartTotal } = useCart();
    // Si el carrito está vacío, mostramos un mensaje
    if (cart.length === 0) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
                <Link className="nav-link" to="/productos">
                    Ver Productos...
                </Link>
            </div>
        );
    }

    // Si hay productos, los mostramos
    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.precio}</p>
                    <p>Subtotal: ${item.precio * item.quantity}</p>
                </div>
            ))}
            <hr />
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={clearCart}>Vaciar Carrito</button>
            <Link to="/"
                  onClick={() => alert("Gracias por comprar")}
                  className="btn-finalizar">
                Finalizar Compra
            </Link>
        </div>
    );
};

export default Cart;