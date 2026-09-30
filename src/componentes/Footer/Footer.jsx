function Footer() {
    const currentYear = new Date().getFullYear().toString(10);

    return (
        <footer style={{
            backgroundColor: "var(--color-de-fondo)",
            padding: "10px",
            textAlign: "center",
            marginTop: "20px",
            color:"black"
        }}>
            <p>&copy; {currentYear} -  Mi Applicación React</p>
        </footer>
    );
}

export default Footer;