import Header from '@/componentes/Header/Header';
import Footer from '@/componentes/Footer/Footer';
import {Outlet} from "react-router-dom";

export function Layout({ children }) {
    return (
        <div className="container">
            <Header/>
                <main className="container">
                    {/* Aquí se renderizará el componente de la ruta activa */}
                    <Outlet/>
                </main>
            <Footer/>
        </div>
    );
}