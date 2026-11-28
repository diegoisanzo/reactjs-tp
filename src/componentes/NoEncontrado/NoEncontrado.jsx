import {Link} from "react-router-dom";

export function NoEncontrado() {
    return (<>
        <h1>Página no encontrada</h1>
        <p>La página que buscás no existe.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </>);
}
