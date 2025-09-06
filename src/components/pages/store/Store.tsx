import {useCallback, useContext, useMemo, useState} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {SearchBar} from "../../filters/SearchBar.tsx";
import Sorting from "../../common/table/Sorting.tsx";
import {Filters} from "../../filters/Filters.tsx";
import Product from "../../../features/classes/Product.ts";
import PageNavigation from "../../common/table/PageNavigation.tsx";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";
import ImagePopup from "../../common/ImagePopup.tsx";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";

const Store = () => {
    const {pageNumber, sort, filters} = useContext(PageProductContext);

    const {addToCart, message} = useCartActions()
    const {isAuthenticated} = useCurrentUser();

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [currentImageProduct, setCurrentImageProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState(true);
    const [errorMsg, setError] = useState<string | null>(null);
    const [isAuthModalVisible, setAuthModalVisible] = useState(false);

    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    if (isLoading)
        setLoading(true)
    if (isError) {
        let errorMsg = "";
        if ('status' in error) {
            errorMsg = `Error: ${error.status} - ${error.data}`;
        } else {
            errorMsg = "Unknown error";
        }
        setError(errorMsg);
    }

    const handleAddToCart = useCallback(async (productId: string) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        try {
            await addToCart(productId);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }

        }

    }, [isAuthenticated, addToCart]);

    const handleImageClick = useCallback((product: Product) => {
        setCurrentImageProduct(product);
        setImagePopupOpen(true);
    }, []);

    return (
        <div
            className={`min-h-screen bg-[#fefaf1] text-[#2a4637] p-6 transition-filter duration-300 ${isImagePopupOpen ? 'blur-sm pointer-events-none' : ''}`}>
            <h1 className="text-4xl font-bold mb-40 text-center">Store</h1>

            <div
                className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/3">
                    <SearchBar/>
                </div>
                <div className="w-full sm:w-1/3">
                    <Sorting dataType={dataTypes.products}/>
                </div>
                <div className="w-full sm:w-1/3">
                    <Filters/>
                </div>
            </div>

            {message && (
                <div
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 transform text-center bg-green-500 text-white text-lg font-bold py-2 px-6 rounded shadow-lg z-50 transition-transform duration-300 ease-in-out">
                    {message}
                </div>
            )}

            {loading ? (
                <p className="text-center text-gray-500 mt-20">Loading...</p>
            ) : errorMsg ? (
                <p className="text-center text-red-500 mt-20">{errorMsg}</p>
            ) : products && products.length > 0 ? (
                <>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {products.map((product: Product) => (
                            <div
                                key={product.id}
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
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <PageNavigation/>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500 mt-20">
                    No products found.
                </div>
            )}

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
    );
};
export default Store