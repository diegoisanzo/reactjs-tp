import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { FormularioCupon } from '../FormularioCupon/FormularioCupon.jsx';
import { formatearPorcentaje } from '../../utils/formatearPorcentaje.js';

const COLECCION_CUPONES = 'Cupones';

const ESTADO_INICIAL_FORM = {
    codigo: '',
    porcentaje: '',
};

export const GestionCupones = () => {
    const [cupones, setCupones] = useState([]);
    const [datosForm, setDatosForm] = useState(ESTADO_INICIAL_FORM);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(ESTADO_INICIAL_FORM);
    };

    useEffect(() => {
        const fetchCupones = async () => {
            try {
                const cuponesRef = collection(db, COLECCION_CUPONES);
                const resp = await getDocs(cuponesRef);
                setCupones(
                    resp.docs.map((documento) => ({ ...documento.data(), id: documento.id }))
                );
            } catch (error) {
                console.error('Error al cargar cupones:', error);
            }
        };
        fetchCupones();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar este cupón?');
        if (!confirmacion) return;

        try {
            const docRef = doc(db, COLECCION_CUPONES, id);
            await deleteDoc(docRef);
            setCupones((prev) => prev.filter((cupon) => cupon.id !== id));
            if (cuponAEditar?.id === id) {
                cancelarEdicion();
            }
            alert('Cupón eliminado.');
        } catch (error) {
            console.error('Error al eliminar cupón:', error);
        }
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        const cuponFinal = {
            codigo: datosForm.codigo.trim(),
            porcentaje: Number(datosForm.porcentaje),
        };

        try {
            if (cuponAEditar) {
                const docRef = doc(db, COLECCION_CUPONES, cuponAEditar.id);
                await updateDoc(docRef, cuponFinal);
                setCupones((prev) =>
                    prev.map((cupon) =>
                        cupon.id === cuponAEditar.id ? { ...cuponFinal, id: cuponAEditar.id } : cupon
                    )
                );
                alert('Cupón actualizado con éxito.');
            } else {
                const docRef = await addDoc(collection(db, COLECCION_CUPONES), cuponFinal);
                setCupones((prev) => [...prev, { ...cuponFinal, id: docRef.id }]);
                alert('Cupón guardado con éxito.');
            }
            cancelarEdicion();
        } catch (error) {
            console.error('Error al guardar cupón:', error);
        }
    };

    const handleEdit = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo ?? '',
            porcentaje: cupon.porcentaje ?? '',
        });
    };

    return (
        <div>
            <h2>Gestión de Cupones</h2>
            <hr />
            <FormularioCupon
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                modoEdicion={cuponAEditar != null}
            />
            {cuponAEditar && (
                <button type="button" onClick={cancelarEdicion}>
                    Cancelar ❌️
                </button>
            )}
            <hr />
            <h3>Lista de Cupones</h3>
            <ul>
                {cupones.map((cupon) => (
                    <li key={cupon.id}>
                        "{cupon.codigo}" - {formatearPorcentaje(cupon.porcentaje)}
                        <button
                            type="button"
                            onClick={() => handleEdit(cupon)}
                            style={{ marginLeft: '10px' }}
                        >
                            Editar ✏️
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(cupon.id)}
                            style={{ marginLeft: '10px' }}
                        >
                            Eliminar ❌️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
