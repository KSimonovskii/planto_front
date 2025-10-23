import type Product from "../../../features/classes/Product.ts";

interface Props {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onRemoveAll: () => void;
    onSetQuantity: (n: number) => void;
    onOpen?: () => void;
}

const CartItem = ({ product, quantity, onAdd, onRemove, onRemoveAll, onSetQuantity, onOpen }: Props) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const parsed = parseInt(raw, 10);
        if (Number.isNaN(parsed)) {
            onSetQuantity(1);
            return;
        }
        const clamped = Math.max(1, Math.min(parsed, product.quantity));
        onSetQuantity(clamped);
    };

    return (
        <div className="cart-item flex items-center gap-4 rounded-lg border border-gray-300 p-4">
            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover cursor-pointer" onClick={onOpen}/>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>
                )}
            </div>

            <div className="cart-item__content flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold truncate">{product.name}</h4>
                        <div className="text-sm text-lime-800">Available: {product.quantity}</div>
                        <div className="text-xs text-gray-400">Pot branding: Not included</div>
                    </div>

                    <button onClick={onRemoveAll} aria-label="Remove" className="cart-item__remove text-gray-400 hover:text-red-500 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6h16v-.5A1.5 1.5 0 0018.5 4H15V3a1 1 0 00-1-1H6zM4 7v9.5A1.5 1.5 0 005.5 18h9a1.5 1.5 0 001.5-1.5V7H4z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-bold">₪{product.price}</div>

                    <div className="cart-item__controls flex items-center gap-2">
                        <button
                            onClick={onRemove}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
                            aria-label="decrease"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                            </svg>
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            onChange={handleInputChange}
                            min={1}
                            max={product.quantity}
                            className="w-16 text-center rounded-md border border-gray-200 px-2 py-1"
                            aria-label="quantity"
                        />

                        <button
                            onClick={onAdd}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
                            aria-label="increase"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
