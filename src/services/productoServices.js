import {collection, getDocs, doc, setDoc, getDoc} from "firebase/firestore";
import {db} from "../firebase/config";

const COLECCION_PRODUCTOS = "Productos nacionales";
const productosDB = collection(db, COLECCION_PRODUCTOS);

// Read - Obtener todos los documentos de nuestra colección productos
export const readProductos = () => {
    return getDocs(productosDB).then((resp) => {
        return resp.docs.map((documento) => ({
            ...documento.data(),
            id: documento.id
        }));
    });
};

export const readProductoPorId = async (id) => {
    const docRef = doc(db, COLECCION_PRODUCTOS, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
        return null;
    }
    return {
        ...snapshot.data(),
        id: snapshot.id
    };
};


export const crearProducto = async (producto) => {
    const {id, ...datosProducto} = producto;
    const idLimpio = id.trim();
    const docRef = doc(db, COLECCION_PRODUCTOS, idLimpio);
    const documentoExistente = await getDoc(docRef);

    if (documentoExistente.exists()) {
        return null;
    }

    await setDoc(docRef, datosProducto);
    return {...datosProducto, id: idLimpio};

};