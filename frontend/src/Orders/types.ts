export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUri: string;
}

//Dados pertencentes na API
export type OrderLocationData = {
    latitude: number;
    longitude: number;
    address: string;
}