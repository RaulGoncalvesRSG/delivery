import "./styles.css";
import ProductCard from "./ProductCard";
import { Product } from "./types";

//Props é um parãmetro passado pelo componente
type Props = {
    products: Product[];
}

function ProductsList({products}: Props){
    return (
        //Representa o bloco 100% da largura        
        <div className="orders-list-container">

            {/*Itens do produto */}
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ProductsList;