import {Product} from "./types";

//Verifica se o produto já está selecionado através do some
export function checkIsSelected(selectedProducts: Product[], product: Product){
    return selectedProducts.some(item => item.id === product.id);
}

export function formatPrice(price: number) {
    //Intl - API de internalização do JS
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"     //Transforma em Real
    })

    return formatter.format(price);
}