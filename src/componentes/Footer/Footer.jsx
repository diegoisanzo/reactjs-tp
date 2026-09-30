import styles from './Footer.module.css'

function Footer() {
    const currentYear = new Date().getFullYear().toString(10);

    return (
        <footer className={styles.footer}>
            <p>&copy; {currentYear} -  Mi Applicaci&oacute;n React</p>
        </footer>
    );
}

export default Footer;