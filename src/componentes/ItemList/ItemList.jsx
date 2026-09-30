
import Item from '../Item/Item'

function ItemList({ productos }) {
    return (
        <div style={{display: 'flex', gap: '20px'}}>
            {
                productos.map(producto =>
                    (<Item key={producto.id} {...producto} />)
                )
            }
        </div>
    );
}

export default ItemList;