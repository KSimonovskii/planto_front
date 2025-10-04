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
import AuthModal from "./AuthModal.tsx";
import Product from "../../../features/classes/Product.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import ProductCard from "../products/ProductCard.tsx";


const SliderMainPage = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const {addToCart, addToLocalCart, getCart, isInCart, isInLocalCart} = useCartActions();
    const {isAuthenticated} = useCurrentUser();
    const swiperRef = useRef<any>(null);
    const {refreshCart} = useCartContext();
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
        <div className="inline-flex flex-col">
            <div className="w-[1640px] flex flex-col overflow-hidden">
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
                            spaceBetween={38}
                            slidesPerView={"auto"}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            className="w-full"
                        >
                            {products.map((product) => (
                                <SwiperSlide
                                    key={product.id}
                                    className="!w-72 h-[430px] inline-flex justify-start items-center px-6"
                                >
                                    <ProductCard
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        isInCart={isInCart(product.id) || isInLocalCart(product.id)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <FramePaginationCorporateFavorites
                            onPrev={() => swiperRef.current?.slidePrev()}
                            onNext={() => swiperRef.current?.slideNext()}
                        />
                        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}/>
                    </>
                )}
            </div>
        </div>
    );
};
export default SliderMainPage;