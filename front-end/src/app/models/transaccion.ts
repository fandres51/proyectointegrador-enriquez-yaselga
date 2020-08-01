export interface Transaccion {
    id:string;
    Descripcion?:string;
    EventoID?:string;
    Fecha: firebase.firestore.Timestamp | Date;
    FilialID?:string;
    Ingreso: boolean;
    Monto:number;
    PersonaID?:string;
    Tipo:string;
    TipoMonetario:string;
}