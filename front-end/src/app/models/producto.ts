export interface Producto{
    id: string;
    nombre: string;
    filial: string;
    proveedor?: string;
    precio: number;
    fotos?: string[];
}