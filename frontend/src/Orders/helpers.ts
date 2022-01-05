import {Product} from "./types";

//Verifica se o produto já está selecionado através do some
export function checkIsSelected(selectedProducts: Product[], product: Product){
    return selectedProducts.some(item => item.id === product.id);
}
