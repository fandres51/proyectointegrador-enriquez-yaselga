export interface Recurso{
    id: string;
    descripcion?:string;
    espacio: boolean;        
    estado: string;
    fotos?: string[];
    nombre: string;
    tipo?: string;
    ubicacion?: string;
    valor?: number;
    condicion: string;
}