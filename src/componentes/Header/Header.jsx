import styles from './Header.module.css'

function SeparadorDeLinks() {
    return <>&nbsp;</>
}

function Header() {
    return (
        <header className={styles.header}>
            <h1>Bienvenidos a mi App React</h1>
            <nav>
                <a href="#inicio">Inicio</a>
                <SeparadorDeLinks/>
                <a href="#productos">Productos</a>
                <SeparadorDeLinks/>
                <a href="#contacto">Contacto</a>
                <SeparadorDeLinks/>
                <a href="#carrito">🛒 Carrito</a>
            </nav>
        </header>
    );
}

export default Header;