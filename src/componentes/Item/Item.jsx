import {useState} from 'react'

function Item({nombre, precio, stock, imagen}) {
    const [esFavorito, setFavorito] = useState(false);
    const marcarODesmarcarComoFavorito = () => {
        setFavorito(!esFavorito);
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

    const AgregarAlCarrito = () => {

        if (cantidad > 0) {
            const unidadTexto = (cantidad === 1) ? 'unidad' : 'unidades';

            alert(`¡Agregaste ${cantidad} ${unidadTexto} de '${nombre}' al changuito!`)
        }

    };

    return (
        <div className="container" style={
                 {
                     border: '1px solid #ccc',
                     padding: '15px',
                     borderRadius: '8px',
                     textAlign: 'center'
                 }
             }>
            <h3 className="h3">{nombre} <span className="badge" onClick={marcarODesmarcarComoFavorito}
                               style={{ fontSize: '24px'}}
            > {esFavorito ? '⭐' : '☆'}
            </span>
            </h3>

            <img className="img-fluid" src={imagen} alt={nombre} width="150"/>
            <p className="lead">Precio: ${precio}</p>
            <p className="lead">Stock disponible: {stock}</p>
            {/* Cuando le boton detecta un clic (onClick), se ejecuta la función */}
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0'
            }}>
                <button className="btn btn-primary" onClick={incrementar}>+1</button>
                <p className="lead" style={{ margin: '0 10px' }}>{cantidad}</p>
                <button className="btn btn-primary" onClick={decrementar}>-1</button>
            </div>
            <button className="btn btn-primary" onClick={AgregarAlCarrito}>Agregar al Carrito</button>
        </div>
    );
}

export default Item;