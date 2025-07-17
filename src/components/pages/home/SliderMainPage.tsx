import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import type Product from "../products/Product.ts";
import {getProductsTable} from "../../../features/api/productAction.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";


const SliderMainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const{addToCart, message} = useCartActions();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProductsTable();
                setProducts(result);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>

            {message && (
                <div className="text-center text-green-600 text-lg font-bold py-2 px-6 rounded shadow-lg z-50">{message}</div>
            )}

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (<Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    // navigation
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
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-24 h-24 object-contain mx-auto mb-4"
                                />
                                <h3 className="font-medium text-lg">{product.name}</h3>
                                <p className="text-gray-700 mt-1 mb-3">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => addToCart(product.id)}
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
        </div>
    )

}

export default SliderMainPage