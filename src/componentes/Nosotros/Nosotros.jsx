import { useState, useEffect } from 'react';
import styles from './Nosotros.module.css';
import { readEquipo } from '../../services/equipoServices.js';

function Nosotros() {
    const [nosotros, setNosotros] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerEquipo = async () => {
            try {
                const datos = await readEquipo();
                setNosotros(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerEquipo();
    }, []);
    if (cargando) {
        return <p className="lead">Cargando equipo...</p>;
    }
    if (error) {
        return <p className="lead">Error: {error}</p>;
    }
    return (
        <div className="container">
            <h1 className="h1">Nosotros</h1>
            <ul className={styles.nosotros}>
                {nosotros.map((integrante) => (
                    <div key={integrante.id} className={styles.integrante}>
                        <h2 className="h2">{integrante.nombre}</h2>
                        <img className="img-fluid" src={integrante.foto} alt={integrante.nombre} width="150" />
                        <p className="lead">Puesto: {integrante.puesto}</p>
                        <p className="lead">Email: {integrante.email}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Nosotros;