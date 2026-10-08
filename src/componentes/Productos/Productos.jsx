import {useState, useEffect} from 'react';
import styles from './Productos.module.css'

function Productos({Mensaje}) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/productos.json')
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('No se pudo cargar la información de los productos destacados');
            }
            return respuesta.json();
        })
        .then(datos => datos.filter(item => item.destacado))
        .then((datos) => {
            setProductos(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
        });
    }, []);
    if (cargando) {
        return <p>Cargando destacados, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div >
            <h1>{Mensaje}</h1>
            <ul className={styles.productosDetalle}>
                {productos.map((producto) => (
                    <div key={producto.id} className={styles.producto}>
                        <h2>{producto.nombre}</h2>
                        <img src={producto.imagen} alt={producto.nombre} width="150"/>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Productos;