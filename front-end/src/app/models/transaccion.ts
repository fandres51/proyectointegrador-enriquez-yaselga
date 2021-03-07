export interface Transaccion {
    id?:string;
    Descripcion?:string;
    EventoID?:string;
    Fecha: Date;
    FechaIngreso?: Date;
    PersonaIngreso?: string;
    FilialID?:string;
    Ingreso: boolean;
    Monto:number;
    PersonaID?:string;
    Tipo: string;
    Activa: boolean;
}