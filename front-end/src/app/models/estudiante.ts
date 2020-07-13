export interface Estudiante {
    
    NoUnico: string;
    Nombre: string;
    Apellido: string;
    Cedula:string;
    Carrera: string;
    CorreoPersonal?: string;
    CorreoInstitucional?: string;
    Telefono?: string;
    FechaNacimiento?: firebase.firestore.Timestamp | Date;
    SectorDomiciliario?: string;
    
    SemestreReferencial: string;
    EstadoAfiliacion: boolean;
    SemestreDeEntrada: string;

    Aportes: Object;
    // EsAutoridad:boolean;
    // Cargo?:string;
}