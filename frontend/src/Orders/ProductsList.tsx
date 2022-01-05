import "./styles.css";
import ProductCard from "./ProductCard";
import { Product } from "./types";
import {checkIsSelected} from "./helpers";

//Props é um parãmetro passado pelo componente
type Props = {
    products: Product[];
    onSelectProduct: (product: Product) => void
    selectedProducts: Product[];
}

function ProductsList({products, selectedProducts, onSelectProduct}: Props){
    return (
        //Representa o bloco 100% da largura        
        <div className="orders-list-container">

            {/*Itens do produto */}
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                        onSelectProduct={onSelectProduct}
                        isSelected={checkIsSelected(selectedProducts, product)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductsList;