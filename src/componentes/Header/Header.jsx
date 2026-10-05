import styles from './Header.module.css'

function Header() {
    return (
        <header className={`${styles.header} container`}>
            <h1 className="h1">Bienvenidos a mi App React</h1>
            <nav className="nav justify-content-center">
                <a className="nav-link" href="#inicio">Inicio</a>
                <a className="nav-link" href="#productos">Productos</a>
                <a className="nav-link" href="#contacto">Contacto</a>
                <a className="nav-link" href="#carrito">🛒 Carrito</a>
            </nav>
        </header>
    );
}

export default Header;