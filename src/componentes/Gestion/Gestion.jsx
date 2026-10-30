import {useEffect, useState} from 'react';
import {db} from '../../firebase/config';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
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

    const [datosForm, setDatosForm] = useState(estadoInicialForm); //// by diego

    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);

    // 2. Nueva función para manejar el cambio del input de tipo "file"
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    // TODO: esto está Ok ?
    const [productoAEditar, setProductoAEditar] = useState(null);
    const cancelarEdicion = () => {
        setProductoAEditar(null);
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

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        // TODO: más validaciones ?
        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return; // Detiene la ejecución de la función
        }


        let urlImagen = datosForm.urlImagen;
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        // --- Lógica para subir la imagen a Imgbb ---
        // TODO: MOVE TO .ENV FILE!
        const apiKey = '3cc4fba47f48888d3eab564bf8444373'; // 🚨 ¡Reemplazá esto con tu clave!
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            setLoading(true);
            const response = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const data = await response.json();
            if (data.success) {
                urlImagen = data.data.url; // Obtenemos la nueva URL
            } else {
                throw new Error('La subida de la imagen falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }

        const productoFinal = {...datosForm, imagen: urlImagen};

        try {
            if (productoAEditar) {
                const docRef = doc(db, "Productos nacionales",
                    productoAEditar.id);
                // update
                await updateDoc(docRef, productoFinal);
                alert("Producto actualizado con éxito.");
            } else {
                // create
                await addDoc(collection(db, "Productos nacionales"),
                    productoFinal);
                alert("Producto guardado con éxito.");
            }
            // ... (reseteo de formulario) ...
        } catch (error) {
            console.error("Error:", error);
        }
    };



    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);


    const [loading, setLoading] = useState(false);

    const handleEdit = (producto) => setProductoAEditar(producto);


     //// by diego
    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr/>
            <FormularioProducto datosForm={datosForm}
                                manejarCambio={manejarCambio}
                                manejarEnvio={manejarEnvio}
                                manejarCambioImagen={manejarCambioImagen}
                                modoEdicion={productoAEditar != null}
                                loading={loading}
            />
            <button onClick={() => cancelarEdicion()}>
                Cancelar ❌️
            </button>
            <hr/>
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        {/*acá agregaremos los botones de acción */}
                        <button onClick={() => handleEdit(prod)}
                                style={{
                                    marginLeft: '10px'
                                }}>
                            Editar ✏️
                        </button>
                        <button onClick={() => handleDelete(prod.id)}
                                style={{ marginLeft: '10px'}}>
                            Eliminar ❌️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;