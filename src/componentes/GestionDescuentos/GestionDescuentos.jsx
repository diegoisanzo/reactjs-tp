import {useEffect, useState} from 'react';
import {db} from '../../firebase/config';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import FormularioDescuento from "../FormularioDescuento/FormularioDescuento.jsx";
import {formatearPorcentaje} from "../../utils/formatearPorcentaje.js";

const GestionDescuentos = () => {
    const [descuentos, setDescuentos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        productIdAsociado: "",
        porcentaje: 0,
        activo: false
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm); //// by diego

    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // TODO: esto está Ok ?
    const [descuentoAEditar, setDescuentoAEditar] = useState(null);
    const cancelarEdicion = () => {
        setDescuentoAEditar(null);
    };

    useEffect(() => {
        const fetchDescuentos = async () => {
            const descuentosRef = collection(db, "Descuentos");
            const resp = await getDocs(descuentosRef);
            setDescuentos(
                resp.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        };
        fetchDescuentos();
    }, [descuentos]);


    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este descuento?");
        if (confirmacion) {
            const docRef = doc(db, "Descuentos", id);
            await deleteDoc(docRef); // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setDescuentos(descuentos.filter(desc => desc.id !== id));
            alert("Descuento eliminado.");
        }
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        // TODO: más validaciones ?
        if (datosForm.nombre.trim() === "" || datosForm.porcentaje <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el porcentaje sea mayor a cero.");
            return; // Detiene la ejecución de la función
        }


        try {
            const descuentoFinal = {...datosForm};

            if (descuentoAEditar) {
                const docRef = doc(db, "Descuentos",
                    descuentoAEditar.id);
                await updateDoc(docRef, descuentoFinal);
                alert("Descuento actualizado con éxito.");
            } else {
                await addDoc(collection(db, "Descuentos"), descuentoFinal);
                alert("Descuento guardado con éxito.");
            }
            // ... (reseteo de formulario) ...
        } catch (error) {
            console.error("Error:", error);
        }
    };



    useEffect(() => {
        if (descuentoAEditar) {
            setDatosForm(descuentoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [descuentoAEditar]);


    const handleEdit = (desc) => setDescuentoAEditar(desc);


     //// by diego
    return (
        <div>
            <h2>Gestión de Descuentos</h2>
            <hr/>
            <FormularioDescuento datosForm={datosForm}
                                manejarCambio={manejarCambio}
                                manejarEnvio={manejarEnvio}
                                modoEdicion={descuentoAEditar != null}
            />
            <button onClick={() => cancelarEdicion()}>
                Cancelar ❌️
            </button>
            <hr/>
            <h3>Lista de Descuentos</h3>
            <ul>
                {descuentos.map((desc) => (
                    <li key={desc.id}>
                        "{desc.nombre}" - {formatearPorcentaje(desc.porcentaje)} -
                        {desc.activo ? '🟩 ACTIVO' : '🟥 DESACTIVADO'}
                        <button onClick={() => handleEdit(desc)} style={{ marginLeft: '10px' }}>
                            Editar ✏️
                        </button>
                        <button onClick={() => handleDelete(desc.id)} style={{ marginLeft: '10px' }}>
                            Eliminar ❌️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default GestionDescuentos;