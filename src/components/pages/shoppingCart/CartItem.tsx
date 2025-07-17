import type Product from "../products/Product.ts";

type Props = {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
};

const CartItem = ({product, quantity, onAdd, onRemove}: Props) => {
    const isOutOfStock = quantity >= product.quantity;

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center p-4 hover:shadow-md transition">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-contain mx-auto mb-4"
            />
            <h3 className="font-medium text-lg text-[#2a4637]">{product.name}</h3>
            <p className="text-gray-700 mt-1 mb-3">{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-6">{quantity.toFixed(2)}</p>
            <p className="text-gray-600 text-sm mb-2">
               Total in the store {product.quantity}
            </p>

            <div className="flex justify-center space-x-3">
                <button
                    onClick={onAdd}
                    disabled={isOutOfStock}
                    className={`py-1 px-3 rounded font-semibold transition ${
                        isOutOfStock
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#9acfaf] text-[#2a4637] hover:bg-[#7aaa8d]"
                    }`}
                >
                    +
                </button>
                <button
                    onClick={onRemove}
                    className="bg-[#9acfaf] text-[#2a4637] font-semibold py-1 px-3 rounded hover:bg-[#7aaa8d] transition"
                >
                    -
                </button>
            </div>

        </div>
    );
};

export default CartItem;