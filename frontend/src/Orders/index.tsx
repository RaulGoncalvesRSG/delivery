import "./styles.css";
import StepesHeader from "./StepesHeader";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderLocation";
import { useEffect, useState } from "react";
import {OrderLocationData, Product} from "./types";
import {fetchProducts} from "../api";

function Orders(){

    const [products, setProducts] = useState<Product[]>([])
    //Representa a localização selecionada pelo usuário
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>()

    useEffect(() => {
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))

    }, []);

    return (
        <div className="orders-container">
            <StepesHeader/>
            <ProductsList products={products}/>
            {/*Td vez q seleciona um endereço, emite um evento para o componente Order e armazena o endereço em setOrderLocation*/}
            <OrderLocation onChangeLocation={location => setOrderLocation(location) }/>
        </div>
    );
}

export default Orders;