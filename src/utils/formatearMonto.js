const formateadorDePesos = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
});

export const formatearMonto = (monto) => formateadorDePesos.format(monto);
