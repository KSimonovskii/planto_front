import {useTranslation} from "react-i18next";
import Product from "../../../features/classes/Product.ts";
import {useNavigate} from "react-router-dom";

interface ProductCardProps {
    product: Product;
    isInCart: boolean;
    onAddToCart: (productId: string) => void;
    onOpen?: () => void;
}

const ProductCard = ({product, isInCart, onAddToCart, onOpen}: ProductCardProps) => {
    const {t} = useTranslation();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (isInCart) {
            navigate("/cart");
        } else {
            onAddToCart(product.id);
        }
    };


    return (
        <div
            className="w-72 h-[430px] inline-flex flex-col justify-start items-start gap-2"
        >
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="w-72 h-72 relative rounded-lg overflow-hidden cursor-pointer"
                     onClick={onOpen}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105"
                    />
                </div>
                <div className="self-stretch flex flex-col gap-1">
                    <div className="w-72 flex items-center overflow-hidden py-4">
                        <div
                            className="flex-1 min-w-0 text-lime-900 text-xl font-bold font-['Rubik'] truncate cursor-pointer hover:underline"
                            onClick={onOpen}>
                            {product.name}
                        </div>
                        <div className="ml-2 shrink-0 text-right text-lime-900 text-xl font-bold font-['Rubik']">
                            ₪ {product.price.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleButtonClick}
                className={`self-stretch px-6 py-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-900 inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition
          ${isInCart ? "bg-lime-900 text-white hover:bg-lime-800" : "bg-white text-lime-900 hover:bg-lime-900 hover:text-white"}`}
            >
                {isInCart ? "Added! Go to cart" : t("cart.addToCart")}
            </button>
        </div>
    );
};

export default ProductCard;