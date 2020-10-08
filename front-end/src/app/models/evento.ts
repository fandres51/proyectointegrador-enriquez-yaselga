export interface Evento {
    //paramtros aceptados por el calendario
    id: string;
    title: string;
    allDay:boolean;
    daysOfWeek?: number[];
    start?: string;
    end?: string;
    startTime?: string;
    endTime?: string;
    startRecur?: string;
    endRecur?: string;
    color: string;
    //parametros extra definidos por las reglas de negocio
    tipo: 'Curso' | 'Club' | 'Evento' | 'Recursivo';
    responsables: string[];
    presupuesto?: number;
    lugar: string;
    descripcion?: string;
}