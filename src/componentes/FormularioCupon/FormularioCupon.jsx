function FormularioCupon({
    datosForm,
    manejarCambio,
    manejarEnvio,
    modoEdicion,
}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px',
    };

    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{!modoEdicion ? 'Agregar Nuevo' : 'Editar'} Cupón</h3>
            <div>
                <label htmlFor="cupon-codigo">Código del cupón:</label>
                <input
                    id="cupon-codigo"
                    type="text"
                    placeholder="Ej: DESC10"
                    name="codigo"
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label htmlFor="cupon-porcentaje">Porcentaje de descuento:</label>
                <input
                    id="cupon-porcentaje"
                    type="number"
                    min="1"
                    max="100"
                    step="any"
                    placeholder="Ej: 10"
                    name="porcentaje"
                    value={datosForm.porcentaje}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <button type="submit">
                {modoEdicion ? 'Actualizar' : 'Guardar Nuevo'} Cupón
            </button>
        </form>
    );
}

export default FormularioCupon;
