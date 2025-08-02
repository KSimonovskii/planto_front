import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCallback, useContext, useEffect, useState} from "react";

import {getProductsTable} from "../../../features/api/productAction.ts";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";
import type Product from "../../clasess/Product.ts";
import ImagePopup from "../products/ImagePopup.tsx";


const SliderMainPage = () => {
    const {products, setProductsData} = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {pageNumber, sort, filters} = useContext(PageContext);
    const {addToCart, message} = useCartActions();
    const {isAuthenticated} = useCurrentUser();

    const [isAuthModalVisible, setAuthModalVisible] = useState(false);

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [currentImageProduct, setCurrentImageProduct] = useState<Product | null>(null);


    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

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
    }, [pageNumber, sort, filters, setProductsData])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddToCart = useCallback(async (productId: string) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        try {
            await addToCart(productId);
        } catch (err: any) {
            setError(err);
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
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
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