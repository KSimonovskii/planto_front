import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { getProductsTable } from "../../../features/api/productAction.ts";
import { PageContext, ProductsContext } from "../../../utils/Context.ts";
import { useCartActions } from "../../../features/hooks/useCartAction.ts";
import { useCurrentUser } from "../../../features/hooks/useCurrentUser.ts";

import "swiper/css";
import "swiper/css/navigation";
import spinner from "../../../assets/spinner2.png";
import FramePaginationCorporateFavorites from "./FramePaginationCorporateFavorites.tsx";

const SliderMainPage = () => {
    const { products, setProductsData } = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { pageNumber, sort, filters } = useContext(PageContext);
    const { addToCart, getCart, isInCart } = useCartActions();
    const { isAuthenticated } = useCurrentUser();

    const swiperRef = useRef<any>(null);

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

    // загружаем корзину при монтировании
    useEffect(() => {
        if (isAuthenticated) {
            getCart();
        }
    }, [isAuthenticated, getCart]);

    const handleAddToCart = useCallback(
        async (productId: string) => {
            if (!isAuthenticated) {
                setError("You must be logged in to add products to cart");
                return;
            }
            try {
                await addToCart(productId);
            } catch (err: any) {
                setError(err.message);
            }
        },
        [isAuthenticated, addToCart]
    );

    return (
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-14 relative">
            <div className="w-[1280px] flex flex-col justify-start items-start gap-8 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-64">
                        <img src={spinner} alt="loading..." className="spinner-icon" />
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
                                    className="!w-72 h-[462px] inline-flex justify-start items-center px-6"
                                >
                                    <div className="w-72 h-[462px] inline-flex flex-col justify-start items-start gap-2">
                                        <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                            <div className="w-72 h-72 relative rounded-lg overflow-hidden">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start gap-1">
                                                <div className="w-72 inline-flex justify-between items-start overflow-hidden">
                                                    <div className="w-56 h-12 text-lime-800 text-xl font-bold font-['Rubik']">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-right text-lime-800 text-xl font-bold font-['Rubik']">
                                                        ₪ {product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                {product.category && (
                                                    <div className="self-stretch text-lime-800 text-base font-normal font-['Rubik'] leading-normal">
                                                        {product.category}
                                                    </div>
                                                )}
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
                                            {isInCart(product.id) ? "Product added to cart" : "Add to cart"}
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <FramePaginationCorporateFavorites
                            onPrev={() => swiperRef.current?.slidePrev()}
                            onNext={() => swiperRef.current?.slideNext()}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default SliderMainPage;
