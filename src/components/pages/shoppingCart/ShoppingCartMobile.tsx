import {type ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {getProductById} from "../../../features/api/productAction.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import CheckoutForm from "../../common/CheckoutForm.tsx";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import OrderSuccessPopup from "../../common/OrderSuccessPopup.tsx";
import {useNavigate} from "react-router";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import type {CartItemDto, CartItemType} from "../../../utils/types";
import SpinnerFlower from "../../../assets/SpinnerFlower.tsx";
import CartItemMobile from "./CartItemMobile.tsx";

const PROMO_CODE = "EINHASHLOSHA";
const PROMO_PERCENT = 0.10;

const ShoppingCartMobile = () => {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const {
        getCart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        getLocalCart,
        addToLocalCart,
        removeFromLocalCart,
        removeAllFromLocalCart,
        syncLocalCartToServer,
    } = useCartActions();

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const {isAuthenticated} = useCurrentUser();
    const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
    const {refreshCart} = useCartContext();

    const [promoInput, setPromoInput] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [promoMessage, setPromoMessage] = useState<string | null>(null);

    const fetchCartItems = useCallback(async (cartData: CartItemDto[]) => {
        setLoading(true);
        setError(null);
        try {
            const productPromises = cartData.map(async (item: CartItemDto) => {
                try {
                    const product = await getProductById(item.productId);
                    return {product, quantity: item.quantity};
                } catch (e) {
                    console.error(`Error fetching product ${item.productId}`, e);
                    return null;
                }
            });

            const fullItems = await Promise.all(productPromises);
            setItems(fullItems.filter(Boolean) as CartItemType[]);
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadAndSyncCart = async () => {
            setLoading(true);
            try {
                const localCart = getLocalCart();
                const hasLocalCart = localCart.length > 0;

                if (isAuthenticated && hasLocalCart) {
                    await syncLocalCartToServer();
                    const serverCartData = await getCart();
                    await fetchCartItems(serverCartData);
                    await refreshCart();
                } else {
                    const cartData = isAuthenticated ? await getCart() : localCart;
                    await fetchCartItems(cartData);
                    await refreshCart();
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAndSyncCart();
    }, [isAuthenticated, getLocalCart, getCart, syncLocalCartToServer, refreshCart, fetchCartItems]);

    const handleAdd = useCallback(
        async (productId: string) => {
            setItems((prev) => {
                const idx = prev.findIndex((p) => p.product.id === productId);
                if (idx > -1) {
                    const copy = [...prev];
                    copy[idx] = {...copy[idx], quantity: Math.min(copy[idx].quantity + 1, copy[idx].product.quantity)};
                    return copy;
                }
                return prev;
            });

            try {
                if (isAuthenticated) {
                    await addToCart(productId);
                    await refreshCart();
                } else {
                    addToLocalCart(productId);
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message || "Failed to add product.");
                await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
            }
        },
        [isAuthenticated, addToCart, addToLocalCart, getCart, getLocalCart, refreshCart, fetchCartItems]
    );

    const handleRemove = useCallback(
        async (productId: string) => {
            setItems((prev) => {
                const idx = prev.findIndex((p) => p.product.id === productId);
                if (idx > -1) {
                    const current = prev[idx].quantity;
                    if (current > 1) {
                        const copy = [...prev];
                        copy[idx] = {...copy[idx], quantity: current - 1};
                        return copy;
                    } else {
                        return prev.filter((i) => i.product.id !== productId);
                    }
                }
                return prev;
            });

            try {
                if (isAuthenticated) {
                    await removeFromCart(productId);
                    await refreshCart();
                } else {
                    removeFromLocalCart(productId);
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message || "Failed to remove product.");
                await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
            }
        },
        [isAuthenticated, removeFromCart, removeFromLocalCart, getCart, getLocalCart, refreshCart, fetchCartItems]
    );

    const handleRemoveAll = useCallback(
        async (productId: string) => {
            setItems((prev) => prev.filter((i) => i.product.id !== productId));

            try {
                if (isAuthenticated) {
                    await removeAllFromCart(productId);
                    await refreshCart();
                } else {
                    removeAllFromLocalCart(productId);
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message || "Failed to remove product.");
                await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
            }
        },
        [isAuthenticated, removeAllFromCart, removeAllFromLocalCart, getCart, getLocalCart, refreshCart, fetchCartItems]
    );

    const handleSetQuantity = useCallback(
        async (productId: string, newQuantity: number) => {
            setItems((prev) => {
                const idx = prev.findIndex((p) => p.product.id === productId);
                if (idx > -1) {
                    const max = prev[idx].product.quantity;
                    const clamped = Math.max(1, Math.min(newQuantity, max));
                    const copy = [...prev];
                    copy[idx] = {...copy[idx], quantity: clamped};
                    return copy;
                }
                return prev;
            });

            try {
                const currentItem = items.find((i) => i.product.id === productId);
                const currentQty = currentItem ? currentItem.quantity : 0;
                const delta = newQuantity - currentQty;

                if (delta === 0) return;

                if (isAuthenticated) {
                    if (delta > 0) {
                        for (let i = 0; i < delta; i++) {
                            await addToCart(productId);
                        }
                    } else {
                        for (let i = 0; i < -delta; i++) {
                            await removeFromCart(productId);
                        }
                    }
                    await refreshCart();
                } else {
                    if (delta > 0) {
                        for (let i = 0; i < delta; i++) addToLocalCart(productId);
                    } else {
                        for (let i = 0; i < -delta; i++) removeFromLocalCart(productId);
                    }
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message || "Failed to update quantity.");
                await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
            }
        },
        [isAuthenticated, addToCart, removeFromCart, addToLocalCart, removeFromLocalCart, getCart, getLocalCart, refreshCart, fetchCartItems, items]
    );

    const handleCheckoutClick = () => {
        if (!isAuthenticated) {
            navigate("/auth/login");
            return;
        }
        setIsCheckoutOpen(true);
    };

    const handleCheckoutSuccess = useCallback(() => {
        setIsCheckoutOpen(false);
        setIsOrderSuccessOpen(true);
    }, []);

    const handleOrderSuccessPopupClose = useCallback(() => {
        setIsOrderSuccessOpen(false);
        navigate("/");
    }, [navigate]);

    const subtotal = useMemo(() => {
        return items.reduce((t, it) => t + it.product.price * it.quantity, 0);
    }, [items]);

    const baseDiscount = subtotal > 500 ? subtotal * 0.1 : 0;

    const promoDiscount = isPromoApplied ? subtotal * PROMO_PERCENT : 0;

    const totalDiscount = baseDiscount + promoDiscount;
    const deliveryFee = subtotal > 500 ? 0 : 70;
    const total = subtotal - totalDiscount + deliveryFee;

    const handlePromoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPromoInput(e.target.value);
        setPromoMessage(null);
    };

    const handleApplyPromo = () => {
        const trimmed = promoInput.trim();
        if (!trimmed) {
            setPromoMessage("Please enter a promo code.");
            return;
        }

        if (trimmed.toUpperCase() === PROMO_CODE) {
            setIsPromoApplied(true);
            setPromoMessage(`Promo applied: ${Math.round(PROMO_PERCENT * 100)}% off`);
        } else {
            setPromoMessage("Invalid promo code.");
            setIsPromoApplied(false);
        }
    };

    const handleRemovePromo = () => {
        setIsPromoApplied(false);
        setPromoInput("");
        setPromoMessage("Promo removed.");
    };

    if (loading) return <SpinnerFlower/>;

    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 sm:p-6 bg-[#f6f8f6] text-[#2a4637] min-h-screen">
            <div className="max-w-xl mx-auto">

                <div className="mb-4">
                    <h2 className="text-2xl font-extrabold uppercase">Your Cart</h2>
                </div>

                <div className="space-y-4">
                    {items.length > 0 ? (
                        items.map(({product, quantity}) => (
                            <CartItemMobile
                                key={product.id}
                                product={product}
                                quantity={quantity}
                                onAdd={() => handleAdd(product.id)}
                                onRemove={() => handleRemove(product.id)}
                                onRemoveAll={() => handleRemoveAll(product.id)}
                                onSetQuantity={(n: number) => handleSetQuantity(product.id, n)}
                                onOpen={() => navigate(`/product/${product.id}`)}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">Your cart is still empty</div>
                    )}
                </div>

                <div className="mt-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal</span>
                            <span className="font-medium">₪{subtotal.toFixed(0)}</span>
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Discount {baseDiscount > 0 ? "(20%)" : ""}{isPromoApplied ? " + promo (10%)" : ""}</span>
                            <span className="text-red-500 font-medium">
                              {totalDiscount > 0 ? `-₪${totalDiscount.toFixed(0)}` : "₪0"}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm mb-4">
                            <span>Delivery</span>
                            <span
                                className="font-medium">{deliveryFee === 0 ? "₪0" : `₪${deliveryFee.toFixed(0)}`}</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center mb-4">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">₪{total.toFixed(0)}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Add promo code"
                                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
                                value={promoInput}
                                onChange={handlePromoInputChange}
                                aria-label="promo-code"
                                disabled={isPromoApplied}
                            />



                            {!isPromoApplied ? (
                                <button
                                    onClick={handleApplyPromo}
                                    className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                                >
                                    Apply
                                </button>
                            ) : (
                                <button
                                    onClick={handleRemovePromo}
                                    className="w-full sm:w-auto px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-sm font-medium text-red-700"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        {promoMessage && <div className="text-sm mb-3 text-gray-600">{promoMessage}</div>}

                        <button
                            onClick={handleCheckoutClick}
                            className="w-full py-3 rounded-lg bg-lime-700 text-white font-medium hover:bg-lime-800 transition"
                        >
                            Go to Checkout
                        </button>
                    </div>
                </div>

            </div>

            <CheckoutForm isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={items}
                          onSuccess={handleCheckoutSuccess}/>
            <OrderSuccessPopup isOpen={isOrderSuccessOpen} onClose={handleOrderSuccessPopupClose}/>
        </div>
    );
};

export default ShoppingCartMobile;
