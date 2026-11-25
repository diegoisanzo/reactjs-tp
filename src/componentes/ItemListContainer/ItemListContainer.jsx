import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';
import { useEffect, useState } from 'react';
import { readProductos } from '../../services/productoServices.js';

export function ItemListContainer({ mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const datos = await readProductos();
                setProductos(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    if (cargando) {
        return <p className="lead">Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p className="lead">Error: {error}</p>;
    }

    return (
        <div className="container">
            <h2 className={`${styles.subtitulo} h2`}>{mensaje}</h2>
            <div className={`${styles.container}`}>
                <ItemList productos={productos} mensaje={"Black Friday*"}/>
            </div>
        </div>
    );
}
