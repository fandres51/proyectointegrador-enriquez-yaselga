export interface Alquiler{
    id: string;
    fechaInicio: Date;
    fechaFin?: Date;
    Garantia?: string;
    Contrato?: string;        
    idRecurso:string;
    idEstudiante?:string;
    idEvento?:string;
}