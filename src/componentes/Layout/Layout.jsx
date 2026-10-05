import Header from '@/componentes/Header/Header';
import Footer from '@/componentes/Footer/Footer';

export function Layout({ children }) {
    return (
        <div className="container">
            <Header/>
            <main className="container">
                {children}
            </main>
            <Footer/>
        </div>
    );
}