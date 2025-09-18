import {useCallback, useEffect, useState} from "react";
import {getProductById} from "../../../features/api/productAction.ts";
import CartItem from "./CartItem.tsx";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import CheckoutForm from "../../common/CheckoutForm.tsx";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import OrderSuccessPopup from "../../common/OrderSuccessPopup.tsx";
import {useNavigate} from "react-router";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import type {CartItemDto, CartItemType} from "../../../utils/types";
import spinner from "../../../assets/spinner2.png";

const ShoppingCart = () => {
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
        syncLocalCartToServer
    } = useCartActions();

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const {isAuthenticated} = useCurrentUser();
    const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
    const {refreshCart} = useCartContext();

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

    const handleAdd = useCallback(async (productId: string) => {
        setItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.product.id === productId);
            if (itemIndex > -1) {
                const newItems = [...prevItems];
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    quantity: newItems[itemIndex].quantity + 1
                };
                return newItems;
            }
            return prevItems;
        });

        try {
            if (isAuthenticated) {
                await addToCart(productId);
                await refreshCart();
            } else {
                addToLocalCart(productId);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Failed to add product.");
            }
            await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
        }
    }, [isAuthenticated, addToCart, addToLocalCart, getCart, getLocalCart, refreshCart]);

    const handleRemove = useCallback(async (productId: string) => {
        setItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.product.id === productId);
            if (itemIndex > -1) {
                const currentQuantity = prevItems[itemIndex].quantity;
                if (currentQuantity > 1) {
                    const newItems = [...prevItems];
                    newItems[itemIndex] = {
                        ...newItems[itemIndex],
                        quantity: newItems[itemIndex].quantity - 1
                    };
                    return newItems;
                } else {
                    return prevItems.filter(item => item.product.id !== productId);
                }
            }
            return prevItems;
        });

        try {
            if (isAuthenticated) {
                await removeFromCart(productId);
                await refreshCart();
            } else {
                removeFromLocalCart(productId);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Failed to remove product.");
            }
            await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
        }
    }, [isAuthenticated, removeFromCart, removeFromLocalCart, getCart, getLocalCart, refreshCart]);

    const handleRemoveAll = useCallback(async (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.product.id !== productId));

        try {
            if (isAuthenticated) {
                await removeAllFromCart(productId);
                await refreshCart();
            } else {
                removeAllFromLocalCart(productId);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Failed to remove product.");
            }
            await fetchCartItems(isAuthenticated ? await getCart() : getLocalCart());
        }
    }, [isAuthenticated, removeAllFromCart, removeAllFromLocalCart, getCart, getLocalCart, refreshCart]);

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
        navigate('/');
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        );
    }

    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    const totalCost = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#2a4637]">
            <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>
                {items.length > 0 ? (
                    <>
                        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                            {items.map(({product, quantity}) => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    quantity={quantity}
                                    onAdd={() => handleAdd(product.id)}
                                    onRemove={() => handleRemove(product.id)}
                                    onRemoveAll={() => handleRemoveAll(product.id)}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <div className="text-2xl font-bold mb-4">
                                Total: ₪ {totalCost.toFixed(2)}
                            </div>
                            <button
                                onClick={handleCheckoutClick}
                                className="w-40 px-3 py-2 rounded-lg outline outline-1 outline-lime-800 font-medium font-['Rubik'] text-lime-800 bg-white hover:bg-lime-800 hover:text-white transition"
                            >
                                Shop Now
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        Your cart is still empty
                    </div>
                )}
            </div>
            <CheckoutForm
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                items={items}
                onSuccess={handleCheckoutSuccess}
            />
            <OrderSuccessPopup
                isOpen={isOrderSuccessOpen}
                onClose={handleOrderSuccessPopupClose}
            />
        </div>
    );
};

export default ShoppingCart;