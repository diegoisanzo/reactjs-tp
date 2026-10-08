import { useParams } from 'react-router-dom';
const ProductoDetalle = () => {
    const { id } = useParams();
    // Con este 'id', podríamos hacer una llamada a una API para buscar los datos del producto
    return (
        <div>
            {/* TODO: terminar! */}
            <h2>Detalle del Producto</h2>
            <p>Mostrando información para el producto con ID:
             <strong>{id}</strong></p>
        </div>
    );
};
export default ProductoDetalle;