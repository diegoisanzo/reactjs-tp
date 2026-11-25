import { useState, useEffect } from 'react';
import { readProductos } from '../../services/productoServices.js';
import { formatearMonto } from '../../utils/formatearMonto.js';

const ProductosNacionales = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const datos = await readProductos();
                setProductos(datos);
            } catch (error) {
                console.error('Error al cargar productos nacionales:', error);
            }
        };

        obtenerProductos();
    }, []);

    return (
        <div>
            <h1>Productos Nacionales</h1>
            <div className="lista-productos">
                {/* 5. Mapeamos el estado `productos` para renderizar cada uno */}
                {
                    productos.map(prod =>
                    {
                     const src = prod.imagen ? prod.imagen : prod.urlImagen;
                     return  (
                        <div key={prod.id} >
                            <img src={src} alt={prod.nombre} style={{
                                width: '100px' }} />
                            <h3>{prod.nombre}</h3>
                            <p>Categoría: {prod.categoria}</p>
                            <p>Precio: {formatearMonto(prod.precio)}</p>
                            <p>Stock: {prod.stock} unidades</p>
                            <hr />
                        </div>
                    )})}
            </div>
        </div>
    );
};
export default ProductosNacionales;