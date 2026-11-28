import styles from './Footer.module.css'

export function Footer() {
    const currentYear = new Date().getFullYear().toString(10);

    return (
        <footer className={`${styles.footer} container`}>
            <p className="lead">&copy; {currentYear} -  Mi Applicaci&oacute;n React</p>
        </footer>
    );
}