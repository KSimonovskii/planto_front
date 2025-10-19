import React, {useCallback, useEffect, useState} from "react";
import {useGetProductByIdQuery} from "../../../features/api/productApi";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import spinner from "../../../assets/spinner2.png";
import {useCartActions} from "../../../features/hooks/useCartAction";
import {useCartContext} from "../../../features/context/CartContext";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser";
import BrandedPots from "./BrandedPots.tsx";
import CustomerReviews from "./CustomerReviews.tsx";
import SliderMainPage from "../home/SliderMainPage.tsx";

const ProductPage: React.FC = () => {
    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductByIdQuery(id ?? "");

    const {addToCart, addToLocalCart, isInCart, isInLocalCart, getCart} = useCartActions();
    const {refreshCart} = useCartContext();
    const {isAuthenticated} = useCurrentUser();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const productId = product?.id ?? "";
    const alreadyInCart = productId
        ? isInCart(productId) || isInLocalCart(productId)
        : false;

    useEffect(() => {
        if (isAuthenticated) {
            getCart();
        }
    }, [isAuthenticated, getCart]);

    const handleAddToCart = useCallback(
        async (productIdToAdd: string) => {
            setErrorMsg(null);
            if (!productIdToAdd) return;

            if (!isAuthenticated) {
                try {
                    addToLocalCart(productIdToAdd);
                    await refreshCart();
                } catch (err: unknown) {
                    if (err instanceof Error) setErrorMsg(err.message);
                }
                return;
            }

            try {
                await addToCart(productIdToAdd);
                await refreshCart();
            } catch (err: unknown) {
                if (err instanceof Error) setErrorMsg(err.message);
            }
        },
        [isAuthenticated, addToCart, addToLocalCart, refreshCart]
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <img src={spinner} alt="loading..." className="w-12"/>
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
        <div className="w-full mx-auto p-6 font-['Rubik']">
            <button
                className="mb-4 text-sm text-lime-800 hover:underline"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="flex flex-col lg:flex-row gap-8 w-full">

                <div className="w-full flex justify-center items-start">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-lime-800">{product.name}</h1>

                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-2xl font-bold text-lime-800">
                            ₪{product.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full">
                            -40%
                        </div>
                    </div>

                    <p className="mt-6 text-base text-lime-800">{product.description}</p>

                    <div className="mt-6">
                        <h3 className="font-semibold text-lime-800">ADVANTAGES</h3>
                        <ul className="mt-3 list-disc list-inside text-lime-800 space-y-2">
                            <li>Minimal care — loves sun, needs little water</li>
                            <li>Symbol of resilience — thrives like our community</li>
                            <li>
                                Purposeful purchase — helps rebuild a kibbutz affected by October 7
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex justify-start w-full lg:w-auto">
                            <button
                                onClick={() => handleAddToCart(product.id)}
                                disabled={alreadyInCart}
                                className={`w-full lg:w-72 px-6 py-3 rounded-lg outline outline-1 outline-lime-800 inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition
        ${
                                    alreadyInCart
                                        ? "bg-lime-800 text-white cursor-default"
                                        : "bg-white text-lime-800 hover:bg-lime-800 hover:text-white"
                                }`}
                            >
                                {alreadyInCart ? t("cart.addedToCart") : t("cart.addToCart")}
                            </button>
                        </div>

                    </div>


                    {errorMsg && (
                        <p className="text-sm text-red-500 mt-3">{errorMsg}</p>
                    )}
                </div>

            </div>
            <div className="w-full my-8">
                <BrandedPots/>
            </div>

            <div className="w-full my-8">
                <CustomerReviews/>
            </div>

            <div className="w-full my-12 text-lime-800 text-6xl font-bold leading-[56px]">
                You Might Also Like
            </div>

            <div className="w-full my-8">
                <SliderMainPage/>
            </div>
        </div>
    );
};

export default ProductPage;
