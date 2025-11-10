import React, {useCallback, useEffect, useState} from "react";
import {useGetProductByIdQuery} from "../../../features/api/productApi";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useCartActions} from "../../../features/hooks/useCartAction";
import {useCartContext} from "../../../features/context/CartContext";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser";
import BrandedPots from "./BrandedPots.tsx";
import CustomerReviews from "./CustomerReviews.tsx";
import SliderMainPage from "../home/SliderMainPage.tsx";
import SpinnerFlower from "../../../assets/SpinnerFlower.tsx";
import {useIsMobile} from "../../../features/hooks/useIsMobile.ts";
import SliderMainPageMobile from "../home/SliderMainPageMobile.tsx";

const ProductPage: React.FC = () => {
    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const isMobile = useIsMobile();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductByIdQuery(id ?? "");

    const {
        addToCart,
        addToLocalCart,
        removeFromCart,
        removeFromLocalCart,
        isInCart,
        isInLocalCart,
        getCart,
        getLocalCart
    } = useCartActions();

    const {refreshCart} = useCartContext();
    const {isAuthenticated} = useCurrentUser();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [inputBusy, setInputBusy] = useState<boolean>(false);


    const productId = product.id ?? "";
    const alreadyInCart = productId
        ? isInCart(productId) || isInLocalCart(productId)
        : false;

    useEffect(() => {
        let mounted = true;

        const loadQuantity = async () => {
            if (!product?.id) {
                if (mounted) setQuantity(0);
                return;
            }
            try {
                if (isAuthenticated) {
                    const serverCart = await getCart();
                    const item = serverCart.find((ci: any) => ci.productId === product.id);
                    if (mounted) setQuantity(item ? item.quantity : 0);
                } else {
                    const local = getLocalCart();
                    const item = local.find((ci: any) => ci.productId === product.id);
                    if (mounted) setQuantity(item ? item.quantity : 0);
                }
            } catch (e) {
                console.error(e);
                if (mounted) setQuantity(0);
            }
        };

        loadQuantity();

        return () => {
            mounted = false;
        };
    }, [product?.id, isAuthenticated, getCart, getLocalCart]);


    const onAdd = useCallback(async () => {
        if (!product?.id) return;
        if (quantity >= product.quantity) return;
        setErrorMsg(null);
        setQuantity(q => q + 1);

        try {
            if (!isAuthenticated) {
                addToLocalCart(product.id);
            } else {
                await addToCart(product.id);
            }
            await refreshCart();
        } catch (err: unknown) {
            setQuantity(q => Math.max(0, q - 1));
            if (err instanceof Error) setErrorMsg(err.message);
        }
    }, [product?.id, quantity, product?.quantity, isAuthenticated, addToCart, addToLocalCart, refreshCart]);

    const onRemove = useCallback(async () => {
        if (!product?.id) return;
        if (quantity <= 0) return;
        setErrorMsg(null);
        setQuantity(q => Math.max(0, q - 1));

        try {
            if (!isAuthenticated) {
                removeFromLocalCart(product.id);
            } else {
                await removeFromCart(product.id);
            }
            await refreshCart();
        } catch (err: unknown) {
            setQuantity(q => q + 1);
            if (err instanceof Error) setErrorMsg(err.message);
        }
    }, [product?.id, quantity, isAuthenticated, removeFromCart, removeFromLocalCart, refreshCart]);

    const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!product?.id) return;
        const raw = e.target.value;
        const parsed = parseInt(raw, 10);
        const valid = Number.isNaN(parsed) ? 0 : Math.max(0, Math.min(parsed, product.quantity));
        const delta = valid - quantity;
        if (delta === 0) {
            setQuantity(valid);
            return;
        }

        setInputBusy(true);
        setErrorMsg(null);
        setQuantity(valid);

        try {
            if (isAuthenticated) {
                if (delta > 0) {
                    for (let i = 0; i < delta; i++) {
                        await addToCart(product.id);
                    }
                } else {
                    for (let i = 0; i < -delta; i++) {
                        await removeFromCart(product.id);
                    }
                }
            } else {
                if (delta > 0) {
                    for (let i = 0; i < delta; i++) addToLocalCart(product.id);
                } else {
                    for (let i = 0; i < -delta; i++) removeFromLocalCart(product.id);
                }
            }
            await refreshCart();
        } catch (err: unknown) {
            if (err instanceof Error) setErrorMsg(err.message);
            try {
                const current = isAuthenticated ? await getCart() : getLocalCart();
                const item = current.find((ci: any) => ci.productId === product.id);
                setQuantity(item ? item.quantity : 0);
            } catch {
                setQuantity(0);
            }
        } finally {
            setInputBusy(false);
        }
    }, [product?.id, product?.quantity, quantity, isAuthenticated, addToCart, removeFromCart, addToLocalCart, removeFromLocalCart, refreshCart, getCart, getLocalCart]);

    const handleGoToCart = () => {
        navigate("/cart");
    }

    const priceNumber = Number(product.price ?? 0);


    if (isLoading) {
        return <SpinnerFlower/>;
    }

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <button className="mb-4 text-sm text-lime-900 hover:underline" onClick={() => navigate(-1)}>← Back
                </button>
                <p className="text-red-500">Failed to load product. Please try again.</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <button className="mb-4 text-sm text-lime-900 hover:underline" onClick={() => navigate(-1)}>← Back
                </button>
                <p className="text-gray-600">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 font-['Rubik']">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="w-full flex justify-center items-start">
                    <img
                        src={product.imageUrl ?? "/placeholder.png"}
                        alt={product.name ?? ""}
                        className="w-full object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-lime-900">{product.name}</h1>

                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-2xl font-bold text-lime-900">
                            ₪{priceNumber.toFixed(2)}
                        </div>
                        <div className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full">
                            -40%
                        </div>
                    </div>

                    <p className="mt-6 text-base text-lime-900">{product.description}</p>

                    <div className="mt-6">
                        <h3 className="font-semibold text-lime-900">ADVANTAGES</h3>
                        <ul className="mt-3 list-disc list-inside text-lime-900 space-y-2">
                            <li>Minimal care — loves sun, needs little water</li>
                            <li>Symbol of resilience — thrives like our community</li>
                            <li>
                                Purposeful purchase — helps rebuild a kibbutz affected by October 7
                            </li>
                        </ul>
                    </div>


                    <div className="mt-4 flex items-center gap-2">
                        <button
                            onClick={onRemove}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
                            aria-label="decrease"
                            disabled={quantity <= 0 || inputBusy}
                            title="Decrease quantity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/>
                            </svg>
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            onChange={handleInputChange}
                            min={0}
                            max={product.quantity}
                            className="w-20 text-center rounded-md border border-gray-200 px-2 py-1"
                            aria-label="quantity"
                            disabled={inputBusy}
                        />

                        <button
                            onClick={onAdd}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
                            aria-label="increase"
                            disabled={quantity >= product.quantity || inputBusy}
                            title="Increase quantity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                            </svg>
                        </button>

                    </div>


                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex flex-col gap-6 justify-start w-full lg:w-auto">

                            <button
                                onClick={onAdd}
                                disabled={alreadyInCart}
                                className={`w-full lg:w-72 px-6 py-3 rounded-lg outline outline-1 outline-lime-900 inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition
        ${
                                    alreadyInCart
                                        ? "bg-lime-900 text-white cursor-default"
                                        : "bg-white text-lime-900 hover:bg-lime-900 hover:text-white"
                                }`}
                            >
                                {alreadyInCart ? t("cart.addedToCart") : t("cart.addToCart")}
                            </button>

                            <button
                                onClick={() => handleGoToCart()}
                                className={"w-full lg:w-72 px-6 py-3 rounded-lg outline outline-1 outline-lime-900 inline-flex justify-center items-center gap-2 " +
                                    "overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition " +
                                    "bg-lime-700 text-white hover:bg-lime-900 hover:text-white"}>
                                {"Go to cart"}
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

            <div className="w-full my-12 text-lime-900 text-6xl font-bold leading-[56px]">
                You Might Also Like
            </div>

            <div className="w-full my-8">
                {!isMobile ? <SliderMainPage/> : <SliderMainPageMobile/>}
            </div>
        </div>
    );
};

export default ProductPage;
