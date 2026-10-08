import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

const ProductoDetalle = () => {
    const {id} = useParams();
    const idDeProductoAEncontrar = parseInt(id);

    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === idDeProductoAEncontrar);
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id]);

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }

    return (
        <div>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} style={{maxWidth: '400px'}}/>
            <h3>${producto.precio}</h3>
            <p>{producto.descripcion}</p>

            {producto.tecnica && <p className="lead">Técnica: {producto.tecnica}</p>}
            {producto.medidas && <p className="lead">Medidas: {producto.medidas}</p>}

            <Link to="/productos">Ver todos los productos</Link>
        </div>
    );
};

export default ProductoDetalle;