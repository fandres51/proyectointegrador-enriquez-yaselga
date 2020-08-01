export interface Estudiante {
    id:string;
    Apellido:string;
    Cargo?:string;
    Carrera?:string;
    Cedula?:string;
    CorreoInstitucional?:string;
    CorreoPersonal?:string;
    Descripcion?:string;
    Deuda?:number;
    Deudor?:boolean;
    EsAutoridad:boolean;
    EsEstudiante:boolean;
    EstadoAfiliacion?:boolean;
    FechaNacimiento?: firebase.firestore.Timestamp | Date;
    Genero?:string;
    NoUnico?:string;
    Nombre:string;
    SectorDomiciliario?:string;
    SemestreReferencial?:string;
    Sexo?:string;
    Telefono?:string;
}