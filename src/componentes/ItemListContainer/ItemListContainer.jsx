// En /componentes/ItemListContainer/ItemListContainer.jsx
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css'
import {useEffect, useState} from "react";

export function ItemListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
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
        return <p className="lead">Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p className="lead">Error: {error}</p>;
    }

    return (
        <div className="container">
            <h2 className={`${styles.subtitulo} h2`}>{Mensaje}</h2>
            <div className={`${styles.container}`}>
                <ItemList productos={productos} mensaje={"Black Friday*"}/>
            </div>
        </div>
    );
}
