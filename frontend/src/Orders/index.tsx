import "./styles.css";
import StepesHeader from "./StepesHeader";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {OrderLocationData, Product} from "./types";
import {fetchProducts, saveOrder} from "../api";
import Footer from "../Footer";
import {checkIsSelected} from "./helpers";

function Orders(){

    const [products, setProducts] = useState<Product[]>([])
    //Estado q guarda todos os produtos selecionados
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    //Representa a localização selecionada pelo usuário
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>()
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    useEffect(() => {
        fetchProducts()
        .then(response => setProducts(response.data))
        .catch(() => {
            toast.warning('Erro ao listar produtos');
          })

    }, []);

    //handleSelectProduct é chamando qnd clica em algum item
    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product)
        
        //Já estiver selecionado, então desmarca o item
        if (isAlreadySelected) {
          //Filtra tds os selecionados com exceção daquele produto
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);            //Limpa a lista de produtos selecionados
        } 
        else {
            //Add o produto na lista
          setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        //Itera sobre a lista de protudos selecionados e extrai somente a propriedade ID
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        //Concatena orderLocation (localização selecionada no mapa) e add a lista de IDs dos produtos
        const payload = {...orderLocation!, products: productsIds}
    
        saveOrder(payload)
            .then((response) => {
                toast.error(`Pedido enviado com sucesso! N° ${response.data.id}`);
                setSelectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
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
                <OrderLocation onChangeLocation={location => setOrderLocation(location) }/>
                {/*amount é a qtd de pedidos selecionados */}
                <OrderSummary 
                    amount={selectedProducts.length} 
                    totalPrice={totalPrice}
                    onsubmit={handleSubmit}
                />
            </div>
            <Footer/>
        </>
    );
}

export default Orders;