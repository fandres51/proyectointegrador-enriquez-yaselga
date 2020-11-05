export interface Asignacion{
    id: string;
    fechaInicio: Date;
    fechaFin?: Date;
    idRecurso:string;
    idFilial:string;
    estado:boolean;
}