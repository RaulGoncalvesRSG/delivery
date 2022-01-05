import "./styles.css";
import StepesHeader from "./StepesHeader";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import {OrderLocationData, Product} from "./types";
import {fetchProducts} from "../api";
import Footer from "../Footer";
import {checkIsSelected} from "./helpers";

function Orders(){

    const [products, setProducts] = useState<Product[]>([])
    //Estado q guarda todos os produtos selecionados
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    //Representa a localização selecionada pelo usuário
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>()

    useEffect(() => {
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))

    }, []);

    //handleSelectProduct é chamando qnd clica em algum item
    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product)
        
        //Já estiver selecionado, então desmarca o item
        if (isAlreadySelected) {
          //Filtra tds os selecionados com exceção daquele produto
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } 
        else {
            //Add o produto na lista
          setSelectedProducts(previous => [...previous, product]);
        }
      }

    return (
        <>
            <div className="orders-container">
                <StepesHeader/>
                <ProductsList 
                    //Td vez q seleciona um endereço, emite um evento para o componente Order e armazena o endereço em setOrderLocation
                    products={products}
                    onSelectProduct={handleSelectProduct}  
                    selectedProducts={selectedProducts}  
                />
                <OrderLocation 
                onChangeLocation={location => setOrderLocation(location) }/>
                <OrderSummary/>
            </div>
            <Footer/>
        </>
    );
}

export default Orders;