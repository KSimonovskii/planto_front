import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCallback, useContext, useEffect, useRef, useState} from "react";

import {getProductsTable} from "../../../features/api/productAction.ts";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";

import "swiper/css";
import "swiper/css/navigation";
import spinner from "../../../assets/spinner2.png";
import FramePaginationCorporateFavorites from "./FramePaginationCorporateFavorites.tsx";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import {useTranslation} from "react-i18next";
import AuthModal from "./AuthModal.tsx";

const SliderMainPage = () => {
    const {products, setProductsData} = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {pageNumber, sort, filters} = useContext(PageContext);
    const {addToCart, getCart, isInCart} = useCartActions();
    const {isAuthenticated} = useCurrentUser();
    const swiperRef = useRef<any>(null);
    const {refreshCart} = useCartContext();
    const {t} = useTranslation();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getProductsTable(pageNumber, sort, filters);
            setProductsData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [pageNumber, sort, filters, setProductsData]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    useEffect(() => {
        if (isAuthenticated) {
            getCart();
        }
    }, [isAuthenticated, getCart]);

    const handleAddToCart = useCallback(
        async (productId: string) => {
            if (!isAuthenticated) {
                setShowAuthModal(true);
                return;
            }
            try {
                await addToCart(productId);
                await refreshCart();
            } catch (err: any) {
                setError(err.message);
            }
        },
        [isAuthenticated, addToCart, refreshCart]
    );

    return (
        <div className="self-stretch inline-flex flex-col justify-start items-start relative">
            <div className="w-[1280px] flex flex-col justify-start items-start gap-4 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-64">
                        <img src={spinner} alt="loading..." className="spinner-icon"/>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={"auto"}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            className="w-full"
                        >
                            {products.map((product) => (
                                <SwiperSlide
                                    key={product.id}
                                    className="!w-72 h-[430px] inline-flex justify-start items-center px-6"
                                >
                                    <div
                                        className="w-72 h-[430px] inline-flex flex-col justify-start items-start gap-2">
                                        <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                            <div className="w-72 h-72 relative rounded-lg overflow-hidden">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="self-stretch flex flex-col gap-1">
                                                <div className="w-72 flex items-center overflow-hidden py-4">
                                                    <div
                                                        className="flex-1 min-w-0 text-lime-800 text-xl font-bold font-['Rubik'] truncate">
                                                        {product.name}
                                                    </div>

                                                    <div
                                                        className="ml-2 shrink-0 text-right text-lime-800 text-xl font-bold font-['Rubik']">
                                                        ₪ {product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            className={`self-stretch px-6 py-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 inline-flex justify-center items-center gap-2 overflow-hidden text-base font-medium font-['Rubik'] leading-normal transition 
                                            ${isInCart(product.id)
                                                ? "bg-lime-600 text-white cursor-default"
                                                : "bg-white text-lime-800 hover:bg-lime-800 hover:text-white"
                                            }`}
                                            disabled={isInCart(product.id)}
                                        >
                                            {isInCart(product.id) ? t("cart.addedToCart") : t("cart.addToCart")}

                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <FramePaginationCorporateFavorites
                            onPrev={() => swiperRef.current?.slidePrev()}
                            onNext={() => swiperRef.current?.slideNext()}
                        />

                        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

                    </>
                )}
            </div>
        </div>
    );
};

export default SliderMainPage;
