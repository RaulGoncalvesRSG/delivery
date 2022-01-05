import axios from "axios"
import { OrderPayload } from "./Orders/types";

const API_URL = "http://localhost:8080"
//Pega a variável de amviente do arquivo ".env"
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

export function fetchProducts(){
    return axios(`${API_URL}/products`);
}

//local é o endereço
export function fetchLocalMapBox(local: string){
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
}

export function saveOrder(payload: OrderPayload){
    return axios.post(`${API_URL}/orders`, payload);
}

