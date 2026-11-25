import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readProductoPorId } from '../../../services/productoServices.js';
import { formatearMonto } from '../../../utils/formatearMonto.js';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProducto = async () => {
            setCargando(true);
            try {
                const encontrado = await readProductoPorId(id);
                setProducto(encontrado);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                setProducto(null);
            } finally {
                setCargando(false);
            }
        };

        obtenerProducto();
    }, [id]);

    if (cargando) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto) {
        return <h2>Producto no encontrado.</h2>;
    }

    return (
        <div>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} style={{maxWidth: '400px'}}/>
            <h3>{formatearMonto(producto.precio)}</h3>
            <p>{producto.descripcion}</p>

            {producto.tecnica && <p className="lead">Técnica: {producto.tecnica}</p>}
            {producto.medidas && <p className="lead">Medidas: {producto.medidas}</p>}

            <Link to="/">Inicio</Link>
        </div>
    );
};

export default ProductoDetalle;