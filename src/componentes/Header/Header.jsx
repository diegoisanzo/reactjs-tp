import styles from './Header.module.css'

function Header() {
    return (
        <header className={`${styles.header} container`}>
            <h1 className="h1">Bienvenidos a mi App React</h1>
            <nav className="nav justify-content-center">
                <a className="nav-link" href="/">Inicio</a>
                <a className="nav-link" href="/productos">Productos</a>
                <a className="nav-link" href="/destacados">Destacados</a>
                <a className="nav-link" href="/carrito">🛒 Carrito</a>
                <a className="nav-link" href="/alta">Alta de Producto</a>
            </nav>
        </header>
    );
}

export default Header;