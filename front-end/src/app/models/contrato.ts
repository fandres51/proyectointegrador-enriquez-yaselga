export interface Contrato {
    id: string;
    fechaInicial: Date;
    fechaFinal: Date;
    prioridad: 'Alta' | 'Media' | 'Baja' | 'Finalizado';
    descripcion: string;
    interesados: string;
}