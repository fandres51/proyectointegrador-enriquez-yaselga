export interface Notificacion{
    id: string;
    titulo:string;
    descripcion?:string;
    Tipo: 'Alerta' | 'Recordatorio' | 'Aviso' | 'Ingreso';
}