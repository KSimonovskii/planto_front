import {useCallback, useEffect, useState} from "react";
import {getProductById} from "../../../features/api/productAction.ts";
import CartItem from "./CartItem.tsx";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import type Product from "../../clasess/Product.ts";

const ShoppingCart = () => {
    const [items, setItems] = useState<{ product: Product; quantity: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {getCart, addToCart, removeFromCart} = useCartActions();

    const fetchCartItems = useCallback( async () => {
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
                }catch (productError){
                    console.error(`Error fetching cart ${item.productId}: `, productError);
                    return null;
                }
            });

            const fullItemsWithNull = await Promise.all(productPromises);
            const loadedItems = fullItemsWithNull.filter(i => i !== null) as {product: Product; quantity: number}[];

            setItems(loadedItems);

        } catch (err: any) {
            console.error("Error fetching cart", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getCart]);

    const handleAdd = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            await addToCart(productId);
            await fetchCartItems();
        } catch (err: any) {
            setError(err.message || "Failed to add product.");
        } finally {
            setLoading(false);
        }
    }, [addToCart, fetchCartItems]);

       const handleRemove = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            await removeFromCart(productId);
            await fetchCartItems();
        } catch (err: any) {
            setError(err.message || "Failed to remove product.");
        } finally {
            setLoading(false);
        }
    }, [removeFromCart, fetchCartItems]);



    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    if (loading) return <div className="text-center text-gray-500">Loading cart...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="h-screen p-6 bg-[#fefaf1] text-[#2a4637]">
            <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>

            {items.length > 0 ? (
                      <div className="w-full max-w-lg mx-auto space-y-4">
                    {items.map(({product, quantity}) => (
                                             <CartItem
                            key={product.id}
                            product={product}
                            quantity={quantity}
                            onAdd={() => handleAdd(product.id)}
                            onRemove={() => handleRemove(product.id)}
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