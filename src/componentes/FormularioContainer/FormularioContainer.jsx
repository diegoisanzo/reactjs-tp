import {useState} from 'react';
import { FormularioProducto } from "../FormularioProducto/FormularioProducto.jsx";
import {collection, getDocs, deleteDoc, updateDoc, doc, addDoc} from
        "firebase/firestore";
import {db} from '../../firebase/config';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: ''
    });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // 2. Nueva función para manejar el cambio del input de tipo "file"
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    // TODO: esto está Ok ?
    const [productoAEditar, setProductoAEditar] = useState(null);
    const cancelarEdicion = () => {
        setProductoAEditar(null);
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


    const [loading, setLoading] = useState(false);

    const modoEdicion = productoAEditar != null;

    return (
        <>
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
                modoEdicion={modoEdicion}
                loading={loading}
            />
            {productoAEditar && (
                <button onClick={cancelarEdicion}>
                    Cancelar Edición
                </button>
            )}
        </>
    );
}