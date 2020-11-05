export interface Producto{
    id: string;
    nombre: string;
    descripcion?: string;
    idproveedor?: string;
    precio: number;
    fotos?: string[];
}