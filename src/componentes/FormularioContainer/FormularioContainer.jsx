import {useState} from 'react';
import FormularioProducto from "../FormularioProducto/FormularioProducto.jsx";

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: ''
    });
    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log('Enviando los siguientes datos a la API:', datosForm);
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
        />
    );
}