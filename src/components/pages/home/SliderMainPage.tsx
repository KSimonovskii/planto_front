import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import "swiper/css";
import "swiper/css/navigation";
import FramePaginationCorporateFavorites from "./FramePaginationCorporateFavorites.tsx";
import {useCartContext} from "../../../features/context/CartContext.tsx";
// import AuthModal from "./AuthModal.tsx";
import Product from "../../../features/classes/Product.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import ProductCard from "../products/ProductCard.tsx";
import {useNavigate} from "react-router-dom";
import SpinnerFlower from "../../../assets/SpinnerFlower.tsx";


const SliderMainPage = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const {addToCart, addToLocalCart, getCart, isInCart, isInLocalCart} = useCartActions();
    const {isAuthenticated} = useCurrentUser();
    const swiperRef = useRef<any>(null);
    const {refreshCart} = useCartContext();
    // const [showAuthModal, setShowAuthModal] = useState(false);
    const {pageNumber, sort, filters} = useContext(PageProductContext);
    const body = useMemo(() => (
        getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters)
    ), [pageNumber, sort, filters]);
    const navigate = useNavigate();
    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(body);
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    );

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
                addToLocalCart(productId);
                await refreshCart();
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

        <div className="w-full">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="relative">
                    {isLoading ? (
                       <SpinnerFlower/>
                    ) : isError ? (
                        <p className="text-center text-red-500">{errorMsg}</p>
                    ) : (
                        <>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={24}
                                slidesPerView={"auto"}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                className="w-full py-6"
                            >
                                {products.map((product) => (
                                    <SwiperSlide
                                        key={product.id}
                                        className="!w-[220px] sm:!w-[260px] md:!w-[300px] lg:!w-[340px] xl:!w-[380px] h-auto inline-flex justify-start items-stretch px-2"
                                    >
                                        <div className="w-full h-full">
                                            <ProductCard
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                isInCart={isInCart(product.id) || isInLocalCart(product.id)}
                                                onOpen={() => navigate(`/product/${product.id}`)}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="mt-4">
                                <FramePaginationCorporateFavorites
                                    onPrev={() => swiperRef.current?.slidePrev()}
                                    onNext={() => swiperRef.current?.slideNext()}
                                />
                            </div>

                            {/*<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />*/}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SliderMainPage;