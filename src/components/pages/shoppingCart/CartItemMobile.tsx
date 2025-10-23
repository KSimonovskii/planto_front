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

const CartItemMobile = ({ product, quantity, onAdd, onRemove, onRemoveAll, onSetQuantity, onOpen }: Props) => {
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
        <article className="relative w-full bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
            <button
                onClick={onRemoveAll}
                aria-label="Remove"
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6h16v-.5A1.5 1.5 0 0018.5 4H15V3a1 1 0 00-1-1H6zM4 7v9.5A1.5 1.5 0 005.5 18h9a1.5 1.5 0 001.5-1.5V7H4z" clipRule="evenodd" />
                </svg>
            </button>

            <div className="flex items-start gap-3">
                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"  onClick={onOpen}/>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Image</div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold leading-tight truncate">{product.name}</h4>

                    <div className="mt-1 text-sm text-gray-600">
                        <div className="text-sm text-lime-800">Available: {product.quantity}</div>
                        <div className="mt-1">Pot branding: <span className="text-gray-800">Not included</span></div>
                    </div>

                    <div className="mt-3 text-lg font-bold">₪{product.price}</div>

                    <div className="mt-3 flex items-center gap-2">
                        <button
                            onClick={onRemove}
                            aria-label="decrease"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 flex-shrink-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
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
                            aria-label="increase"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 flex-shrink-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CartItemMobile;
