import styles from './ItemList.module.css'
import { Item } from '../Item/Item'

export function ItemList({ productos, mensaje }) {
    return (
        <>
            <h1>{mensaje}</h1>
            <div className={`${styles.container} container`}>
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