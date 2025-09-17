import Product from "../../../features/classes/Product.ts";
import { Trash2 } from "lucide-react";

type Props = {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onRemoveAll: () => void;
};

const CartItem = ({ product, quantity, onAdd, onRemove, onRemoveAll }: Props) => {
    const isOutOfStock = quantity >= product.quantity;

    return (
        <div
            className="w-72 h-[430px] flex flex-col justify-start items-start gap-3 p-3 rounded-lg border border-lime-800 shadow-sm hover:shadow-md transition">

            {/*image*/}

            <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-50">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/*info*/}

            <div className="self-stretch flex flex-col gap-1 flex-1">
                <div className="flex items-center overflow-hidden">
                    <div className="flex-1 min-w-0 text-lime-800 text-xl font-bold font-['Rubik'] truncate">
                        {product.name}
                    </div>
                    <div className="ml-2 shrink-0 text-right text-lime-800 text-xl font-bold font-['Rubik']">
                        ₪ {product.price.toFixed(2)}
                    </div>
                </div>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="text-sm text-gray-600">Available: {product.quantity}</p>
            </div>

            {/*buttons*/}

            <div className="self-stretch flex justify-between items-center gap-2 mt-auto">
                <button
                    onClick={onAdd}
                    disabled={isOutOfStock}
                    className={`flex-1 px-3 py-2 rounded-lg outline outline-1 outline-lime-800 font-medium font-['Rubik'] transition
                        ${isOutOfStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-lime-800 hover:bg-lime-800 hover:text-white"
                    }`}
                >
                    +
                </button>
                <button
                    onClick={onRemove}
                    className="flex-1 px-3 py-2 rounded-lg outline outline-1 outline-lime-800 font-medium font-['Rubik'] bg-white text-lime-800 hover:bg-lime-800 hover:text-white transition"
                >
                    -
                </button>
                <button
                    onClick={onRemoveAll}
                    className="flex-1 px-3 py-2 rounded-lg outline outline-1 outline-red-600 font-medium font-['Rubik'] bg-white text-red-600 hover:bg-red-600 hover:text-white transition"
                    aria-label="Remove all items from cart"
                >
                    <Trash2 size={16} className="inline-block"/>
                </button>

            </div>
        </div>
    );
};

export default CartItem;
