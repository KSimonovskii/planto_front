import {useCallback, useEffect, useState} from "react";
import {getProductById} from "../../../features/api/productAction.ts";
import CartItem from "./CartItem.tsx";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import type Product from "../../clasess/Product.ts";

interface CartItemType {
    product: Product;
    quantity: number;
}

const ShoppingCart = () => {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {getCart, addToCart, removeFromCart, removeAllFromCart} = useCartActions();

    const fetchCartItems = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const cartOfUser = await getCart();
            if (cartOfUser.length === 0) {
                setItems([]);
                setLoading(false);
                return;
            }

            const productPromises = cartOfUser.map(async (item) => {
                try {
                    const product = await getProductById(item.productId);
                    return {product, quantity: item.quantity};
                } catch (productError) {
                    console.error(`Error fetching cart ${item.productId}: `, productError);
                    return null;
                }
            });

            const fullItemsWithNull = await Promise.all(productPromises);
            const loadedItems = fullItemsWithNull.filter(i =>
                i !== null) as CartItemType[];

            setItems(loadedItems);

        } catch (err: any) {
            console.error("Error fetching cart", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getCart]);

    const handleAdd = useCallback(async (productId: string) => {
        try {
            await addToCart(productId);

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

        } catch (err: any) {
            setError(err.message || "Failed to add product.");
            await fetchCartItems();
        }
    }, [addToCart, fetchCartItems]);

    const handleRemove = useCallback(async (productId: string) => {

        try {
            await removeFromCart(productId);

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

        } catch (err: any) {
            setError(err.message || "Failed to remove product.");
            await fetchCartItems()
        }
    }, [removeFromCart, fetchCartItems]);

    const handleRemoveAll = useCallback(async (productId: string) => {
        try {
            await removeAllFromCart(productId);
            setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
        } catch (err: any) {
            setError(err.message || "Failed to remove product.");
            await fetchCartItems();
        }
    }, [removeAllFromCart, fetchCartItems]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    if (loading) return <div className="text-center text-gray-500">Loading cart...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="h-screen p-6 bg-[#fefaf1] text-[#2a4637]">
            <div className="mb-40"></div>

            <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>

            {items.length > 0 ? (
                <div

                    className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
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
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    Your cart is still empty
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;