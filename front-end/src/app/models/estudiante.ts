import { Timestamp } from '@firebase/firestore-types';

export interface Estudiante {
    id:string;
    Apellido:string;
    Cargo?:string;
    Carrera?:string;
    CorreoInstitucional?:string;
    CorreoPersonal?:string;
    Descripcion?:string;
    Deuda?:number;
    Deudor?:boolean;
    EsAutoridad:boolean;
    EsEstudiante:boolean;
    EstadoAfiliacion?:boolean;
    FechaNacimiento?: Timestamp;
    Genero?:string;
    NoUnico?:string;
    Nombre:string;
    SectorDomiciliario?:string;
    SemestreReferencial?:string;
    Sexo?:string;
    Telefono?:string;
}