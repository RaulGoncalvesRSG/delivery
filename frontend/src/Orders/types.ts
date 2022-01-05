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

type ProductID = {
    id: number;
}

//OrderPayload será enviado para o back end para fazer o pedido
export type OrderPayload = {
    products: ProductID[];
    //"&" faz um merge entre os tipos de dados. OrderPayload tem tds propriedades de ProductID e OrderLocationData
} & OrderLocationData;