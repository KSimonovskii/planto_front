import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";

import "swiper/css";
import "swiper/css/navigation";
import spinner from "../../../assets/spinner2.png";
import FramePaginationCorporateFavorites from "./FramePaginationCorporateFavorites.tsx";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import {useTranslation} from "react-i18next";
import AuthModal from "./AuthModal.tsx";
import Product from "../../../features/classes/Product.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";

const SliderMainPage = () => {

    const [errorMsg, setErrorMsg] = useState("");
    const {addToCart, getCart, isInCart} = useCartActions();
    const {isAuthenticated} = useCurrentUser();
    const swiperRef = useRef<any>(null);
    const {refreshCart} = useCartContext();
    const {t} = useTranslation();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const {pageNumber, sort, filters} = useContext(PageProductContext);

    const body = useMemo(() => (
        getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters)
    ), [pageNumber, sort, filters]);

    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(body);

    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    let msg = "";
    if (isError) {
        msg = 'status' in error ? `Error: ${error.status} - ${error.data}` : "Unknown error";
        setErrorMsg(msg);
    }

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
            } catch (err: unknown) {
                if (err instanceof Error)
                setErrorMsg((prevState => prevState + "/n" + err.message));
            }
        },
        [isAuthenticated, addToCart, refreshCart]
    );

    return (
        <div className="self-stretch inline-flex flex-col justify-start items-start relative">
            <div className="w-[1280px] flex flex-col justify-start items-start gap-4 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-64">
                        <img src={spinner} alt="loading..." className="spinner-icon"/>
                    </div>
                ) : isError ? (
                    <p className="text-center text-red-500">{errorMsg}</p>
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
