import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useCart} from "../../context/CartContext.jsx";

function Header() {

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();


    return (
        <header className={`${styles.header} container`}>
            <h1 className="h1">Bienvenidos a mi App React</h1>
            <nav className="nav justify-content-center">
                <li><Link className="nav-link" to="/">Inicio</Link></li>
                <li><Link className="nav-link" to="/productos">Productos</Link></li>
                <li><Link className="nav-link" to="/destacados">Destacados</Link></li>
                <li><Link className="nav-link" to="/carrito">🛒 Carrito {totalItems > 0 &&
                    <span>{totalItems}</span>}</Link></li>
                <li><Link className="nav-link" to="/alta">Alta de Productos</Link></li>
            </nav>
        </header>
    );
}

export default Header;