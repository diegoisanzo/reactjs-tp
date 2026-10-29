import { useState, useEffect } from 'react';
// Importaciones clave de Firebase
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const poblarProductosNacionales = async () => {
    try {
        const coleccion = 'Productos nacionales';

        const respuesta = await fetch('/data/productos.json');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        for (const item of productos) {
            const { id, ...data } = item;
            const docRef = doc(db, coleccion, String(id));

            // setDoc sobreescribe el documento si ya existe con ese ID exacto
            await setDoc(docRef, {
                ...data,
                id: Number(id)
            }, { merge: true });
        }

        console.log('Carga completada con éxito.');
    } catch (error) {
        console.error('Error al poblar la colección:', error);
    }
};

const poblarEquipo = async () => {
    try {
        const coleccion = 'Equipo';

        const respuesta = await fetch('/data/nosotros.json');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const equipo = await respuesta.json();

        for (const item of equipo) {
            const { id, ...data } = item;
            const docRef = doc(db, coleccion, String(id));

            // setDoc sobreescribe el documento si ya existe con ese ID exacto
            await setDoc(docRef, {
                ...data,
                id: Number(id)
            }, { merge: true });
        }

        console.log('Carga completada con éxito.');
    } catch (error) {
        console.error('Error al poblar la colección:', error);
    }
};


const ProductosNacionales = () => {
// Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        poblarProductosNacionales()
            .then(poblarEquipo)
            .then(() => {
            const productosDB = collection(db, "Productos nacionales");
            getDocs(productosDB).then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return {...doc.data(), id: doc.id}
                    })
                );
            });
        });
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

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
                            <p>Precio: ${prod.precio}</p>
                            <p>Stock: {prod.stock} unidades</p>
                            <hr />
                        </div>
                    )})}
            </div>
        </div>
    );
};
export default ProductosNacionales;