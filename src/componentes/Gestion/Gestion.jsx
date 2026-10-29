import {useState, useEffect} from 'react';
import {db} from '../../firebase/config';
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
//import {FormularioContainer} from "../FormularioContainer/FormularioContainer.jsx";
import FormularioProducto from "../FormularioProducto/FormularioProducto.jsx";

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "Productos nacionales");
            // Ajustar "productos" al nombre de tu colección
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        };
        fetchProductos();
    }, [productos]);


    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "Productos nacionales", id);
            await deleteDoc(docRef); // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };


    const [productoAEditar, setProductoAEditar] = useState(null);

    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);


    const handleEditClick = (producto) => {
        setProductoAEditar(producto);};


    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr/>
            <FormularioProducto datosForm={estadoInicialForm}/>
            <hr/>
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        {/*acá agregaremos los botones de acción */}
                        <button onClick={() => handleDelete(prod.id)}
                                style={{ marginLeft: '10px' }}>
                            Eliminar
                        </button>
                        <button onClick={() => handleEditClick(prod)}
                                style={{
                                    marginLeft: '10px',
                                    marginRight: '10px'
                                }}>
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;