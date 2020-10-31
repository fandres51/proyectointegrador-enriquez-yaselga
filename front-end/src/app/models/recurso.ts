export interface Recurso{
    id: string;
    descripcion?:string;
    espacio: boolean;        
    estado: 'Libre'|'Ocupado'|'Alquilado'|'Reservado'|'Baja'|'Reparacion';
    fotos?: string[];
    nombre: string;
    tipo?: string;
    ubicacion?: string;
    valor?: number;
    condicion: 'Nuevo'|'Usado'|'Averiado'|'Perdido';
}