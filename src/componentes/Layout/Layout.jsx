import Header from '@/componentes/Header/Header';
import Footer from '@/componentes/Footer/Footer';

export function Layout({ children }) {
    return (
        <div>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}