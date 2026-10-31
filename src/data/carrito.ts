const CLAVE = "carrito";

export type ItemCarrito = { id: number; cantidad: number };

export function leerCarrito(): ItemCarrito[] {
    try {
        const guardado = localStorage.getItem(CLAVE);
        return guardado ? JSON.parse(guardado) : [];
    } catch {
        return [];
    }
}

function guardarCarrito(lista: ItemCarrito[]) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function agregar(id: number) {
    const lista = leerCarrito();
    const existente = lista.find((item) => item.id === id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        lista.push({ id, cantidad: 1});
    }

    guardarCarrito(lista);
}

export function cambiarCantidad(id: number, cantidad: number) {
    const lista = leerCarrito();
    const item = lista.find((i) => i.id === id);
    if (!item) return;
    if (!Number.isFinite(cantidad)) return;

    item.cantidad = Math.max(1, Math.floor(cantidad));
    guardarCarrito(lista);
}

export function quitar(id: number) {
    guardarCarrito(leerCarrito().filter((item) => item.id !== id));
}

export function vaciar() {
    localStorage.removeItem(CLAVE);
}

export function totalCantidad(): number {
    return leerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
}

window.dispatchEvent(new Event('carrito-cambio'));