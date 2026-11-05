import { usuarios } from './usuarios';

const CLAVE = 'usuariosNuevos';

export type Usuario = {
    id_cliente: number;
    Nombre_apellido: string;
    correo: string;
    contrasena: string;
    descuento: number;
    atencion_prioritaria: boolean;
};

export function leerUsuariosNuevos(): Usuario[] {
    try {
        const guardado = localStorage.getItem(CLAVE);
        return guardado ? JSON.parse(guardado) : [];
    } catch {
        return [];
    }
}

// Todos los usuarios: los de prueba (usuarios.ts) y los registrados desde la web
export function todosLosUsuarios(): Usuario[] {
    return [...usuarios, ...leerUsuariosNuevos()];
}

export function correoExiste(correo: string): boolean {
    return todosLosUsuarios().some((u) => u.correo === correo.trim().toLowerCase());
}

export function buscarUsuario(correo: string, contrasena: string): Usuario | undefined {
    return todosLosUsuarios().find(
        (u) => u.correo === correo.trim().toLowerCase() && u.contrasena === contrasena
    );
}

// Crea el usuario (sin descuento ni prioridad) y lo devuelve
export function registrarUsuario(nombre: string, correo: string, contrasena: string): Usuario {
    const nuevos = leerUsuariosNuevos();
    const nuevo: Usuario = {
        id_cliente: Math.max(100, ...nuevos.map((u) => u.id_cliente)) + 1,
        Nombre_apellido: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        contrasena,
        descuento: 0,
        atencion_prioritaria: false,
    };
    nuevos.push(nuevo);
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    return nuevo;
}

// Guarda la sesión (nunca la contraseña)
export function iniciarSesion(u: Usuario) {
    sessionStorage.setItem('sesion', JSON.stringify({
        id_cliente: u.id_cliente,
        nombre: u.Nombre_apellido,
        descuento: u.descuento,
        prioritaria: u.atencion_prioritaria,
    }));
}