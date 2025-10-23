import type Product from "../../features/classes/Product.ts";
import { useCurrentUser } from "../../features/hooks/useCurrentUser.ts";
import { useOrderActions } from "../../features/hooks/useOrderActions.ts";
import { useCartActions } from "../../features/hooks/useCartAction.ts"; // <- added
import { Fragment, useCallback, useMemo, useState, type ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCartContext } from "../../features/context/CartContext.tsx";

interface CheckoutItem {
    product: Product;
    quantity: number;
}

interface CheckoutFormProps {
    isOpen: boolean;
    onClose: () => void;
    items: CheckoutItem[];
    onSuccess: () => void;
    promoInput?: string;
    isPromoApplied?: boolean;
    promoPercent?: number; // e.g. 0.10
    onApplyPromo?: (code: string) => void;
    onRemovePromo?: () => void;
}

const DEFAULT_PROMO_CODE = "EINHASHLOSHA";
const DEFAULT_PROMO_PERCENT = 0.1;
const DELIVERY_PRICE = 70;
const BASE_DISCOUNT_THRESHOLD = 500;
const BASE_DISCOUNT_PERCENT = 0.1; // 10%

const CheckoutForm = ({
                          isOpen,
                          onClose,
                          items,
                          onSuccess,
                          promoInput: promoInputFromProps,
                          isPromoApplied: isPromoAppliedFromProps,
                          promoPercent: promoPercentFromProps,
                          onApplyPromo,
                          onRemovePromo,
                      }: CheckoutFormProps) => {
    const { user } = useCurrentUser();
    const { createOrder } = useOrderActions();
    const { refreshCart } = useCartContext();

    // Use cart actions hook to get clearLocalCart / clearCart
    const { clearCart, clearLocalCart } = useCartActions();

    const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
    const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [promoInputLocal, setPromoInputLocal] = useState("");
    const [isPromoAppliedLocal, setIsPromoAppliedLocal] = useState(false);
    const [promoMessageLocal, setPromoMessageLocal] = useState<string | null>(null);

    const promoInput = promoInputFromProps ?? promoInputLocal;
    const isPromoApplied = typeof isPromoAppliedFromProps === "boolean" ? isPromoAppliedFromProps : isPromoAppliedLocal;
    const promoPercent = promoPercentFromProps ?? DEFAULT_PROMO_PERCENT;
    const promoMessage = promoMessageLocal;

    const subtotal = useMemo(() => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [items]);

    const baseDiscount = useMemo(() => {
        return subtotal > BASE_DISCOUNT_THRESHOLD ? subtotal * BASE_DISCOUNT_PERCENT : 0;
    }, [subtotal]);

    const promoDiscount = useMemo(() => {
        return isPromoApplied ? subtotal * promoPercent : 0;
    }, [subtotal, isPromoApplied, promoPercent]);

    const totalDiscount = baseDiscount + promoDiscount;

    const deliveryPrice = useMemo(() => (subtotal > BASE_DISCOUNT_THRESHOLD ? 0 : DELIVERY_PRICE), [subtotal]);

    const total = useMemo(() => {
        return Math.max(0, subtotal - totalDiscount + deliveryPrice);
    }, [subtotal, totalDiscount, deliveryPrice]);

    const handlePromoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof promoInputFromProps === "undefined") {
            setPromoInputLocal(e.target.value);
            setPromoMessageLocal(null);
        } else {
        }
    };

    const applyPromoLocally = (code: string) => {
        const trimmed = code.trim();
        if (!trimmed) {
            setPromoMessageLocal("Please enter a promo code.");
            return;
        }

        if (trimmed.toUpperCase() === DEFAULT_PROMO_CODE) {
            setIsPromoAppliedLocal(true);
            setPromoMessageLocal(`Promo applied: ${Math.round(promoPercent * 100)}% off`);
        } else {
            setPromoMessageLocal("Invalid promo code.");
            setIsPromoAppliedLocal(false);
        }
    };

    const handleApplyPromo = () => {
        if (onApplyPromo) {
            onApplyPromo(promoInput);
            return;
        }
        applyPromoLocally(promoInput);
    };

    const handleRemovePromo = () => {
        if (onRemovePromo) {
            onRemovePromo();
            return;
        }
        setIsPromoAppliedLocal(false);
        setPromoInputLocal("");
        setPromoMessageLocal("Promo removed.");
    };

    const handleCreateOrder = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError(null);

            const orderItems = items.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            }));

            try {
                await createOrder({
                    items: orderItems,
                    deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : null,
                    deliveryMethod: deliveryMethod,
                    paymentMethod: paymentMethod,
                    amounts: {
                        subtotal,
                        baseDiscount,
                        promoDiscount,
                        totalDiscount,
                        deliveryPrice,
                        total,
                    },
                    promo: isPromoApplied ? { code: promoInput ?? DEFAULT_PROMO_CODE, percent: promoPercent } : null,
                } as any);

                try {
                    clearLocalCart();
                } catch (localErr) {
                    console.warn("Failed to clear local cart:", localErr);
                }

                try {
                    await clearCart();
                } catch (serverErr) {
                    console.warn("Failed to clear server cart:", serverErr);
                }

                try {
                    await refreshCart();
                } catch (rErr) {
                    console.warn("Failed to refresh cart context:", rErr);
                }

                onSuccess();
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error while creating order.");
                }
            } finally {
                setLoading(false);
            }
        },
        [
            items,
            createOrder,
            deliveryAddress,
            deliveryMethod,
            paymentMethod,
            subtotal,
            baseDiscount,
            promoDiscount,
            totalDiscount,
            deliveryPrice,
            total,
            isPromoApplied,
            promoInput,
            promoPercent,
            refreshCart,
            onSuccess,
            clearLocalCart,
            clearCart,
        ]
    );

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-4">
                                    Checkout
                                </Dialog.Title>

                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                <form onSubmit={handleCreateOrder}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Delivery Details</h4>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Delivery Method</label>
                                                <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value as "pickup" | "delivery")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                    <option value="pickup">Pickup</option>
                                                    <option value="delivery">Delivery</option>
                                                </select>
                                            </div>

                                            {deliveryMethod === "delivery" && (
                                                <div className="mb-4">
                                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                        Delivery Address
                                                    </label>
                                                    <input type="text" id="address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required={deliveryMethod === "delivery"} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                                </div>
                                            )}

                                            <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
                                            <div className="mb-4">
                                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                    <option value="card">Credit Card</option>
                                                    <option value="cash">Cash on Delivery</option>
                                                </select>
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="text-lg font-semibold mb-2">Promo Code</h4>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Promo code"
                                                        value={promoInput}
                                                        onChange={handlePromoInputChange}
                                                        disabled={!!promoInputFromProps && typeof onApplyPromo === "undefined"} // if parent provides input but no handler, don't let user edit
                                                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                                                        aria-label="promo-code"
                                                    />
                                                    {!isPromoApplied ? (
                                                        <button type="button" onClick={handleApplyPromo} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                                                            Apply
                                                        </button>
                                                    ) : (
                                                        <button type="button" onClick={handleRemovePromo} className="px-3 py-2 rounded-md bg-red-100 hover:bg-red-200 text-sm font-medium text-red-700">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                {promoMessage && <p className="text-sm text-gray-600 mt-2">{promoMessage}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Your Order</h4>
                                            <div className="max-h-60 overflow-y-auto mb-4 border border-gray-200 rounded-md p-2">
                                                {items.map((item) => (
                                                    <div key={item.product.id} className="flex justify-between items-center text-sm py-1 border-b last:border-b-0">
                                                        <span>
                                                            {item.product.name} (x{item.quantity})
                                                        </span>
                                                        <span>₪{(item.product.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="text-right font-medium text-sm space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Subtotal:</span>
                                                    <span>₪{subtotal.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span>Base discount {baseDiscount > 0 ? `(${Math.round(BASE_DISCOUNT_PERCENT * 100)}%)` : ""}:</span>
                                                    <span className="text-red-600">-₪{baseDiscount.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span>Promo discount {isPromoApplied ? `(${Math.round(promoPercent * 100)}%)` : ""}:</span>
                                                    <span className="text-red-600">-₪{promoDiscount.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span>Delivery:</span>
                                                    <span>{deliveryPrice === 0 ? "₪0" : `₪${deliveryPrice.toFixed(2)}`}</span>
                                                </div>

                                                <div className="border-t pt-3 flex justify-between items-center mt-2 text-lg font-bold">
                                                    <span>Total:</span>
                                                    <span>₪{total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white font-semibold transition ${loading ? "bg-gray-400" : "bg-lime-700 hover:bg-lime-800"}`}>
                                            {loading ? "Processing..." : "Place Order"}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CheckoutForm;
