import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCallback, useContext, useMemo, useState} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";
import Product from "../../../features/classes/Product.ts";
import ImagePopup from "../../common/ImagePopup.tsx";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";


const SliderMainPage = () => {

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const {addToCart, message} = useCartActions();
    const {isAuthenticated} = useCurrentUser();

    const [isAuthModalVisible, setAuthModalVisible] = useState(false);

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [currentImageProduct, setCurrentImageProduct] = useState<Product | null>(null);

    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

    const {pageNumber, sort, filters} = useContext(PageProductContext);
    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters));

    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    if (isLoading) {
        setLoading(true)
    }
    if (isError) {

        let errorMsg = "";
        if ('status' in error) {
            errorMsg = `Error: ${error.status} - ${error.data}`;
        } else {
            errorMsg = "Unknown error";
        }
        setErrorMsg(errorMsg);
    }

    const handleAddToCart = useCallback(async (productId: string) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        try {
            await addToCart(productId);
        } catch (err: unknown) {
            if (err instanceof Error){
                setErrorMsg(err.message);
            }
        }

    }, [isAuthenticated, addToCart]);

    const handleImageClick = useCallback((product: Product) => {
        setCurrentImageProduct(product);
        setImagePopupOpen(true);
    }, []);

    return (
        <div>

            {message && (
                <div
                    className="text-center text-green-600 text-lg font-bold py-2 px-6 rounded shadow-lg z-50">{message}</div>
            )}

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : errorMsg ? (
                <p className="text-center text-red-500">{errorMsg}</p>
            ) : (<Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}

                    pagination={{
                        clickable: true,
                        el: ".custom-pagination",
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div
                                className="bg-white rounded-xl shadow-sm overflow-hidden text-center p-4 hover:shadow-md transition"
                            >
                                <img
                                    onClick={() => handleImageClick(product)}
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-contain mx-auto mb-4 cursor-zoom-in"
                                />
                                <h3 className="font-medium text-lg">{product.name}</h3>
                                <p className="text-gray-700 mt-1 mb-3">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className="bg-[#9acfaf] text-[#2a4637] font-semibold py-2 px-4 rounded hover:bg-[#7aaa8d] transition"
                                >
                                    Add
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="custom-pagination mt-6 flex justify-center"/>

            <AuthPromptModal isOpen={isAuthModalVisible} onClose={closeAuthModal}/>

            {currentImageProduct && (
                <ImagePopup
                    isOpen={isImagePopupOpen}
                    setIsOpen={setImagePopupOpen}
                    name={currentImageProduct.name}
                    category={currentImageProduct.category}
                    url={currentImageProduct.imageUrl}
                />
            )}
        </div>
    )

}

export default SliderMainPage