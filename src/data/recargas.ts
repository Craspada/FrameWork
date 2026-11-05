// Recarga de extintores: cada extintor debe recargarse/mantenerse cada cierto tiempo.
// Para cambiar el plazo, se modifica solo esta constante.
export const MESES_RECARGA = 12;

const CLAVE = 'recargas';

// Fechas de recarga hechas por el cliente. Se guardan así: { "idVenta-idProducto": "2026-11-04" }
export function leerRecargas(): Record<string, string> {
    try {
        const guardado = localStorage.getItem(CLAVE);
        return guardado ? JSON.parse(guardado) : {};
    } catch {
        return {};
    }
}

export function registrarRecarga(clave: string) {
    const recargas = leerRecargas();
    recargas[clave] = new Date().toLocaleDateString('sv-SE');
    localStorage.setItem(CLAVE, JSON.stringify(recargas));
}

// Fecha límite = fecha de compra (o de la última recarga) + MESES_RECARGA
export function calcularVencimiento(fechaBase: string): Date {
    const fecha = new Date(fechaBase + 'T00:00:00');
    fecha.setMonth(fecha.getMonth() + MESES_RECARGA);
    return fecha;
}

// Descompone los milisegundos que faltan en días, horas, minutos y segundos
export function descomponer(ms: number) {
    const total = Math.floor(Math.abs(ms) / 1000);
    return {
        dias: Math.floor(total / 86400),
        horas: Math.floor((total % 86400) / 3600),
        minutos: Math.floor((total % 3600) / 60),
        segundos: total % 60,
    };
}