export interface Producto{
    id: string;
    nombre: string;
    descripcion?: string;
    idfilial?: string;
    idproveedor: string;
    precio: number;
    fotos?: string[];
}