import {useState, useEffect} from 'react';
import styles from './Nosotros.module.css'

function Nosotros() {
    const [nosotros, setNosotros] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/nosotros.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información del equipo');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setNosotros(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);
    if (cargando) {
        return <p>Cargando equipo...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <h1>Nosotros</h1>
            <ul className={styles.nosotros}>
                {nosotros.map((integrante) => (
                    <div key={integrante.id} className={styles.integrante}>
                        <h2>{integrante.nombre}</h2>
                        <img src={integrante.foto} alt={integrante.nombre} width="150" />
                        <p>Puesto: {integrante.puesto}</p>
                        <p>Email: {integrante.email}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Nosotros;