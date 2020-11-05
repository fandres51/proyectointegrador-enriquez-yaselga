export interface Notificacion {
    id?:string;
    nombre: string;
    descripcion: string;
    tipo: 'Alerta' | 'Recordatorio' | 'Aviso' | 'Ingreso';
    tiempo: Date;
    
}
