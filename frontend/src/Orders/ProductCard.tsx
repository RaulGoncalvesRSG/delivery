import { Product } from "./types";

type Props = {
    product: Product;
    onSelectProduct: (product: Product) => void
    isSelected: boolean;                
}

function formatPrice(price: number) {
    //Intl - API de internalização do JS
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"     //Transforma em Real
    })

    return formatter.format(price);
}

function ProductCard({product, onSelectProduct, isSelected}: Props){
    return (
        //Se estiver selecionado coloca a borda verde
        <div className={`order-card-container ${isSelected? "selected": ""}`} 
             onClick={() => onSelectProduct(product)}>
            <h3 className="order-card-title">
                {product.name}
            </h3>

            <img 
                src={product.imageUri}
                className="order-card-image"
                alt={product.name}
            />

            <h3 className="order-card-price">{formatPrice(product.price)}</h3>
            
            <div className="order-card-description">
                <h3 className="order-card-descriotion">
                    Descrição
                </h3>
                
                <p>{product.description}</p>
            </div>

        </div>
    );
}

export default ProductCard;