export type Compra = {
    id_venta: number;
    id_cliente: number;
    fecha: string;
    id_producto: number;
    cantidad: number;
};

export const compras = [
    { id_venta: 1, id_cliente: 1, fecha: '2026-09-12', id_producto: 2, cantidad: 3 },
    { id_venta: 2, id_cliente: 1, fecha: '2026-10-03', id_producto: 6, cantidad: 1 },
    { id_venta: 3, id_cliente: 2, fecha: '2026-09-28', id_producto: 5, cantidad: 4 },
    { id_venta: 4, id_cliente: 2, fecha: '2026-10-15', id_producto: 11, cantidad: 2 },
]; 

const CLAVE_NUEVAS = 'comprasNuevas';

export function leerComprasNuevas(): Compra[] {
    try {
        const guardado = localStorage.getItem(CLAVE_NUEVAS);
        return guardado ? JSON.parse(guardado) : [];
    } catch {
        return [];
    }
}

export function registrarCompra(id_cliente: number, items: {id: number, cantidad: number }[]){
    const nuevas = leerComprasNuevas();
    const id_venta = Math.max(100, ...nuevas.map(c => c.id_venta)) + 1;
    const fecha = new Date().toLocaleDateString('sv-SE');

    for (const item of items) {
        nuevas.push({
            id_venta,
            id_cliente,
            fecha,
            id_producto: item.id,
            cantidad: item.cantidad
        });
    }

    localStorage.setItem(CLAVE_NUEVAS, JSON.stringify(nuevas));
}