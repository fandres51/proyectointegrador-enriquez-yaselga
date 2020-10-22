export interface Estudiante {
    
    NoUnico: string;
    Nombre?: string;
    Apellido: string;
    Cedula:string;
    Carrera: 'Sistemas' | 'Computacion' | 'Software';
    CorreoPersonal?: string;
    CorreoInstitucional?: string;
    Telefono?: string;
    FechaNacimiento?: firebase.firestore.Timestamp | Date;
    SectorDomiciliario?: string;
    SemestreReferencial: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Egresado' | 'Graduado' | 'Retirado';
    EstadoAfiliacion: 'No afiliado' | 'No aportante' | 'Aportante'
}