export interface Contrato {
    id: string;
    nombre: string;
    fechaInicial: Date;
    fechaFinal: Date;
    prioridad: 'Alta' | 'Media' | 'Baja' | 'Finalizado';
    descripcion: string;
    interesados: string;
}