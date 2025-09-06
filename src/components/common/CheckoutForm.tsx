import type Product from "../../features/classes/Product.ts";
import {useCurrentUser} from "../../features/hooks/useCurrentUser.ts";
import {useCartActions} from "../../features/hooks/useCartAction.ts";
import {useOrderActions} from "../../features/hooks/useOrderActions.ts";
import {Fragment, useCallback, useMemo, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

interface CheckoutItem {
    product: Product;
    quantity: number;
}

interface CheckoutFormProps {
    isOpen: boolean;
    onClose: () => void;
    items: CheckoutItem[];
    onSuccess: () => void;
}

const CheckoutForm = ({isOpen, onClose, items, onSuccess}: CheckoutFormProps) => {
    const {user} = useCurrentUser();
    const {createOrder} = useOrderActions();
    const {clearCart} = useCartActions();
    const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deliveryPrice = 10;

    const subtotal = useMemo(() => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [items]);

    const total = useMemo(() => {
        return subtotal + (deliveryMethod === 'delivery' ? deliveryPrice : 0);
    }, [subtotal, deliveryMethod]);

    const handleCreateOrder = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const orderItems = items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
        }));

        try {
            await createOrder({
                items: orderItems,
                deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : null,
                deliveryMethod: deliveryMethod,
                paymentMethod: paymentMethod,
            });
            await clearCart();
            onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [items, createOrder, clearCart, onSuccess, deliveryAddress, deliveryMethod, paymentMethod]);

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0"
                                  enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
                                          enterTo="opacity-100 scale-100" leave="ease-in duration-200"
                                          leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel
                                className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-4">
                                    Checkout
                                </Dialog.Title>
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <form onSubmit={handleCreateOrder}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Delivery Details</h4>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Delivery
                                                    Method</label>
                                                <select
                                                    value={deliveryMethod}
                                                    onChange={(e) => setDeliveryMethod(e.target.value as 'pickup' | 'delivery')}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                >
                                                    <option value="pickup">Pickup</option>
                                                    <option value="delivery">Delivery</option>
                                                </select>
                                            </div>

                                            {deliveryMethod === 'delivery' && (
                                                <div className="mb-4">
                                                    <label htmlFor="address"
                                                           className="block text-sm font-medium text-gray-700">Delivery
                                                        Address</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        value={deliveryAddress}
                                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                                        required={deliveryMethod === 'delivery'}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </div>
                                            )}

                                            <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
                                            <div className="mb-4">
                                                <select
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                >
                                                    <option value="card">Credit Card</option>
                                                    <option value="cash">Cash on Delivery</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Your Order</h4>
                                            <div
                                                className="max-h-60 overflow-y-auto mb-4 border border-gray-200 rounded-md p-2">
                                                {items.map((item) => (
                                                    <div key={item.product.id}
                                                         className="flex justify-between items-center text-sm py-1 border-b last:border-b-0">
                                                        <span>{item.product.name} (x{item.quantity})</span>
                                                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-right font-medium">
                                                <div className="flex justify-between mt-2">
                                                    <span>Subtotal:</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span>Delivery:</span>
                                                    <span>{deliveryMethod === 'delivery' ? `$${deliveryPrice.toFixed(2)}` : 'Free'}</span>
                                                </div>
                                                <div
                                                    className="flex justify-between mt-2 text-xl font-bold border-t pt-2">
                                                    <span>Total:</span>
                                                    <span>${total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`px-4 py-2 rounded-md text-white font-semibold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                        >
                                            {loading ? 'Processing...' : 'Place Order'}
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