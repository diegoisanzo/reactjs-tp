import {useState} from 'react'
import {Link} from "react-router-dom";
import {useCart} from "../../context/useCart.js";
import styles from './Item.module.css'

function Favorito({esFavorito, onclick}) {
    return <span className="badge" onClick={onclick}
                 style={{fontSize: '24px', cursor: 'pointer'}}
    > {esFavorito ? '⭐' : '☆'}
                </span>;
}

function Item({id, nombre, precio, stock, imagen}) {
    const [esFavorito, setFavorito] = useState(false);
    const marcarODesmarcarComoFavorito = () => {
        setFavorito(!esFavorito);
    };

    // Lógica del Carrito
    const { addToCart, getCantidadActual } = useCart(); // Traemos la función del contexto
    const manejarAgregarAlCarrito = () => {
        if (cantidad > 0) {
            const unidadTexto = (cantidad === 1) ? 'unidad' : 'unidades';

            const producto = {id, nombre, precio, stock, imagen};

            addToCart(producto, cantidad);
            alert(`¡Agregaste ${cantidad} ${unidadTexto} de '${nombre}' al changuito!`)
        }
    };

    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const cantidadActual = getCantidadActual(id);

        return (
            <div className={styles.item}>
                <h3 className="h3">
                    <Link to={`/producto/${id}`}>{nombre}</Link>
                    <Favorito esFavorito={esFavorito} onclick={marcarODesmarcarComoFavorito}/>
                </h3>
            <img className="img-fluid" src={imagen} alt={nombre} width="150"/>
            <p className="lead">Precio: ${precio}</p>
            <p className="lead">Stock: {stock}</p>
            {/* Cuando le boton detecta un clic (onClick), se ejecuta la función */}
            <div className={`${styles.cantidad} container`}>
                <button className="btn btn-primary" onClick={incrementar}>+1</button>
                <p className="lead" style={{ margin: '0 10px' }}>{cantidadActual}</p>
                <button className="btn btn-primary" onClick={decrementar}>-1</button>
            </div>
            <button className="btn btn-primary" onClick={manejarAgregarAlCarrito}>Agregar al {cantidad} Carrito</button>
        </div>
    );
}

export default Item;