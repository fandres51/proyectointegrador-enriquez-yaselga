export interface Incidente {
    id?:string;
    nombre: string;
    descripcion: string;
    resuelto: boolean;
    estudiante?: string;
    evento?: string;
    fecha: Date;
}