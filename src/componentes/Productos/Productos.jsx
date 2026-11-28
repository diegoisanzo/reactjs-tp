import { useState, useEffect } from 'react';
import styles from './Productos.module.css';
import { Link } from 'react-router-dom';
import { readProductos } from '../../services/productoServices.js';
import { formatearMonto } from '../../utils/formatearMonto.js';

export function Productos({ mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDestacados = async () => {
            try {
                const datos = await readProductos();
                setProductos(datos.filter((item) => item.destacado));
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerDestacados();
    }, []);
    if (cargando) {
        return <p>Cargando destacados, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div >
            <h1>{mensaje}</h1>
            <ul className={styles.productosDetalle}>
                {productos.map((producto) => (
                    <Link key={producto.id} to={`/producto/${producto.id}`}>
                        <div className={styles.producto}>
                            <h2>{producto.nombre}</h2>
                            <img src={producto.imagen} alt={producto.nombre} width="150"/>
                            <p>Precio: {formatearMonto(producto.precio)}</p>
                        </div>
                    </Link>
                ))}
            </ul>

        </div>
    );
}