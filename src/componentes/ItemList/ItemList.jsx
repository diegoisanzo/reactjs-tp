
import Item from '../Item/Item'

function ItemList({ productos, mensaje }) {
    return (
        <>
            <h1>{mensaje}</h1>
            <div className="container" style={{display: 'flex', gap: '20px'}}>
                {
                    productos.map(producto =>
                        <Item key={producto.id}
                               {...producto}
                        />
                    )
                }
            </div>
        </>
    );
}

export default ItemList;