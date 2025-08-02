import {useCallback, useContext, useEffect, useState} from "react";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import {getProductsTable} from "../../../features/api/productAction.ts";
import {SearchBar} from "../../filters/SearchBar.tsx";
import Sorting from "../products/Sorting.tsx";
import {Filters} from "../../filters/Filters.tsx";
import type Product from "../../clasess/Product.ts";
import PageNavigation from "../products/PageNavigation.tsx";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";

const Store = () => {
    const {products, setProductsData} = useContext(ProductsContext);
    const {pageNumber, sort, filters} = useContext(PageContext);

    const {addToCart, message} = useCartActions()
    const {isAuthenticated} = useCurrentUser();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthModalVisible, setAuthModalVisible] = useState(false);

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


    return (
        <div className="min-h-screen bg-[#fefaf1] text-[#2a4637] p-6">
            <h1 className="text-4xl font-bold mb-40 text-center">Store</h1>

            <div
                className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/3">
                    <SearchBar/>
                </div>
                <div className="w-full sm:w-1/3">
                    <Sorting/>
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
            ) : error ? (
                <p className="text-center text-red-500 mt-20">{error}</p>
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
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-contain mx-auto mb-4"
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

        </div>
    );
};
export default Store