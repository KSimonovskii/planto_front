import { useTranslation } from "react-i18next";
import Product from "../../../features/classes/Product.ts";

interface ProductCardProps {
    product: Product;
    isInCart: boolean;
    onAddToCart: (productId: string) => void;
}

const ProductCard = ({ product, isInCart, onAddToCart }: ProductCardProps) => {
    const { t } = useTranslation();

    return (
        <div
            className="w-72 h-[430px] inline-flex flex-col justify-start items-start gap-2"
        >
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="w-72 h-72 relative rounded-lg overflow-hidden">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="self-stretch flex flex-col gap-1">
                    <div className="w-72 flex items-center overflow-hidden py-4">
                        <div className="flex-1 min-w-0 text-lime-800 text-xl font-bold font-['Rubik'] truncate">
                            {product.name}
                        </div>
                        <div className="ml-2 shrink-0 text-right text-lime-800 text-xl font-bold font-['Rubik']">
                            ₪ {product.price.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => onAddToCart(product.id)}
                className={`self-stretch px-6 py-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition
                    ${isInCart
                    ? "bg-lime-600 text-white cursor-default"
                    : "bg-white text-lime-800 hover:bg-lime-800 hover:text-white"
                }`}
                disabled={isInCart}
            >
                {isInCart ? t("cart.addedToCart") : t("cart.addToCart")}
            </button>
        </div>
    );
};

export default ProductCard;