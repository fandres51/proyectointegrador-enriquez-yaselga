export interface Reserva{
    id: string;
    fechaInicio: Date;
    fechaFin?: Date;
    idRecurso:string;
    idEstudiante?:string;
    idEvento?:string;
    estado:boolean;
}