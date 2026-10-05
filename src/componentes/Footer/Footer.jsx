import styles from './Footer.module.css'
import Nosotros from "../Nosotros/Nosotros.jsx";

function Footer() {
    const currentYear = new Date().getFullYear().toString(10);

    return (
        <footer className={`${styles.footer} container`}>
            <Nosotros />
            <p className="lead">&copy; {currentYear} -  Mi Applicaci&oacute;n React</p>
        </footer>
    );
}

export default Footer;