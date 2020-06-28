export interface Transaccion {
    id:string;
    Descripcion?:string;
    EventoID?:string;
    Fecha:Date;
    FilialID?:String;
    Monto:number;
    PersonaID?:string;
    Tipo:string;
    TipoMonetario:string;
}