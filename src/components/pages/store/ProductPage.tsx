import React, { useCallback, useState } from "react";
import { useGetProductByIdQuery } from "../../../features/api/productApi";
import { useParams, useNavigate } from "react-router-dom";
import spinner from "../../../assets/spinner2.png";

import { useCartActions } from "../../../features/hooks/useCartAction";
import { useCartContext } from "../../../features/context/CartContext";
import { useCurrentUser } from "../../../features/hooks/useCurrentUser";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductByIdQuery(id ?? "");

    const { addToCart, addToLocalCart, isInCart, isInLocalCart } = useCartActions();
    const { refreshCart } = useCartContext();
    const { isAuthenticated } = useCurrentUser();

    // const [quantity, setQuantity] = useState<number>(1);
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const productId = product?.id ?? "";

    const alreadyInCart = productId ? (isInCart(productId) || isInLocalCart(productId)) : false;

    const handleAddToCart = useCallback(
        async (productIdToAdd: string) => {
            setErrorMsg(null);
            if (!productIdToAdd) return;
            setBtnLoading(true);

            if (!isAuthenticated) {
                try {
                    addToLocalCart(productIdToAdd);
                    await refreshCart();
                } catch (err: unknown) {
                    if (err instanceof Error) setErrorMsg(err.message);
                } finally {
                    setBtnLoading(false);
                }
                return;
            }

            try {
                await addToCart(productIdToAdd);
                await refreshCart();
            } catch (err: unknown) {
                if (err instanceof Error) setErrorMsg(err.message);
            } finally {
                setBtnLoading(false);
            }
        },
        [isAuthenticated, addToCart, addToLocalCart, refreshCart]
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <img src={spinner} alt="loading..." className="w-12" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <button
                    className="mb-4 text-sm text-lime-800 hover:underline"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <p className="text-red-500">Failed to load product. Please try again.</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <button
                    className="mb-4 text-sm text-lime-800 hover:underline"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
                <p className="text-gray-600">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 font-['Rubik']">
            <button
                className="mb-4 text-sm text-lime-800 hover:underline"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 flex justify-center items-start">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-[540px] object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-lime-800">{product.name}</h1>

                    <div className="mt-3 flex items-center gap-4">
                        <div className="text-2xl font-bold text-lime-800">₪{product.price}</div>
                        <div className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full">-40%</div>
                    </div>

                    <p className="mt-6 text-base text-lime-800">{product.description}</p>

                    <div className="mt-6">
                        <h3 className="font-semibold text-lime-800">ADVANTAGES</h3>
                        <ul className="mt-3 list-disc list-inside text-lime-800 space-y-2">
                            <li>Minimal care — loves sun, needs little water</li>
                            <li>Symbol of resilience — thrives like our community</li>
                            <li>Purposeful purchase — helps rebuild a kibbutz affected by October 7</li>
                        </ul>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        {/*<div className="flex items-center gap-2">*/}
                        {/*    <button*/}
                        {/*        onClick={() => setQuantity((q) => Math.max(1, q - 1))}*/}
                        {/*        className="px-3 py-1 bg-zinc-100 rounded disabled:opacity-50"*/}
                        {/*        aria-label="decrease"*/}
                        {/*    >*/}
                        {/*        -*/}
                        {/*    </button>*/}
                        {/*    <div className="px-4">{quantity}</div>*/}
                        {/*    <button*/}
                        {/*        onClick={() => setQuantity((q) => q + 1)}*/}
                        {/*        className="px-3 py-1 bg-zinc-100 rounded"*/}
                        {/*        aria-label="increase"*/}
                        {/*    >*/}
                        {/*        +*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <div className="ml-auto flex gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => handleAddToCart(product.id)}
                                disabled={alreadyInCart || btnLoading}
                                className={`px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium transition
                  ${alreadyInCart ? "bg-lime-600 text-white cursor-default" : "bg-white text-lime-800 hover:bg-lime-800 hover:text-white"}
                `}
                            >
                                {btnLoading ? (
                                    <img src={spinner} alt="loading" className="w-5 h-5" />
                                ) : alreadyInCart ? (
                                    "In cart"
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    </div>

                    {errorMsg && <p className="text-sm text-red-500 mt-3">{errorMsg}</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
