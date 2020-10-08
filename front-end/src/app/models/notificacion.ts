export interface Notificacion {
    id?:string;
    nombre: string;
    descripcion: string;
    tiempo: Date;
    Tipo: 'Alerta' | 'Recordatorio' | 'Aviso' | 'Ingreso';
}
