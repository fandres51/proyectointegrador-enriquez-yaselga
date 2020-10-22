export interface Autoridad {
    id: string;
    NoUnico: string;
    CorreoInstitucional: string;
    NivelDeAcceso: 0 | 1 | 2 | 3 | 4;
    Cargo: string;
    Nombre: string;
    Telefono: string;
    CorreoPersonal: string;
    Cedula: string
}