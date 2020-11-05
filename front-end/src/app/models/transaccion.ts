export interface Transaccion {
    id:string;
    Descripcion?:string;
    EventoID?:string;
    Fecha: Date;
    FilialID?:string;
    Ingreso: boolean;
    Monto:number;
    PersonaID?:string;
    Tipo: 'Afiliacion' | 'Evento' | 'Bar' | 'Alquiler' | 'Otro';
    Activa: boolean;
}