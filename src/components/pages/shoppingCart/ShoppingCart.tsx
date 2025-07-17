import { useEffect, useState } from "react";

import type Product from "../products/Product.ts";

import { getProductById } from "../../../features/api/productAction.ts";
import CartItem from "./CartItem.tsx";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";

const ShoppingCart = () => {
    const [items, setItems] = useState<{ product: Product; quantity: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {getCart, addToCart, removeFromCart } = useCartActions();


    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const cartData = await getCart();
            const fullItems = await Promise.all(
                cartData.map(async (item) => {
                    const product = await getProductById(item.productId);
                    return { product, quantity: item.quantity };
                })
            );
            setItems(fullItems);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (productId: string) => {
        await addToCart(productId);
        await fetchCartItems();
    };

    const handleRemove = async (productId: string) => {
        await removeFromCart(productId);
        await fetchCartItems();
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) return <div className="text-center text-gray-500">Loading cart...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="h-screen p-6 bg-[#fefaf1] text-[#2a4637]">
            <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>

            {items.length > 0 ? (
                <div className="w-80 h-[80vh] space-y-4 pr-3">
                    {items.map(({ product, quantity }) => (
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
