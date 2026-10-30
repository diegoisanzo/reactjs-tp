function FormularioDescuento({ datosForm,
                                 manejarCambio,
                                 manejarEnvio,
                                 modoEdicion}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };


    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{!modoEdicion ? 'Agregar Nuevo' : 'Editar'} Descuento</h3>
            <div>
                <label>Nombre del Descuento:</label>
                <input
                    type="text"
                    placeholder="Ej: Descuento Teclado Mecánico"
                    name="nombre" // Atributo clave para identificar el input
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Product Id asociado:</label>
                <input
                    type="text"
                    name="productIdAsociado" // Atributo clave
                    value={datosForm.productIdAsociado}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Porcentaje:</label>
                <input type="number"
                       min="0.1"
                       max="100"
                       step="any"
                       placeholder="Ej: 5"
                       name="porcentaje"
                       value={datosForm.porcentaje}
                       onChange={manejarCambio}/>
            </div>
            <div>
                <label>Activo:</label>
                <input type="checkbox"
                       name="activo"
                       value={datosForm.activo}
                       onChange={manejarCambio}/>
            </div>
            <button type="submit">
                {modoEdicion ? 'Actualizar' : 'Guardar Nuevo'} Descuento
            </button>
        </form>
    );
}

export default FormularioDescuento;