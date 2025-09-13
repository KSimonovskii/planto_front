import {useCallback, useContext, useMemo, useState} from "react";
import {PageProductContext, ProductsContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import Product from "../../../features/classes/Product.ts";
import PageNavigation from "../../common/table/PageNavigation.tsx";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";
import ImagePopup from "../../common/ImagePopup.tsx";
import ProductHierarchy from "./ProductHierarchy.tsx";
import FiltersAndSorting from "./FiltersAndSorting.tsx";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import {useMatch} from "react-router";
import ProductsCards from "../products/card/ProductsCards.tsx";

const Store = () => {
    const {pageNumber, sort, filters} = useContext(PageProductContext);

    const {addToCart, message} = useCartActions()
    // const {isAuthenticated} = useCurrentUser();

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [currentImageProduct, setCurrentImageProduct] = useState<Product | null>(null);

    const [errorMsg, setError] = useState<string | null>(null);
    const [isAuthModalVisible, setAuthModalVisible] = useState(false);

    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

    const match = useMatch("/store/*");
    let params = "";
    if (match) {
        params = match.params["*"];
    }
    const arrHierarchy = params ? params.split("/") : [];

    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    let msg = "";
    if (isError) {
        msg = 'status' in error ? `Error: ${error.status} - ${error.data}` : "Unknown error";
        setError(msg);
    }

    // const handleAddToCart = useCallback(async (productId: string) => {
    //     if (!isAuthenticated) {
    //         openAuthModal();
    //         return;
    //     }
    //     try {
    //         await addToCart(productId);
    //     } catch (err: unknown) {
    //         if (err instanceof Error) {
    //             setError(err.message);
    //         }
    //
    //     }
    //
    // }, [isAuthenticated, addToCart]);

    const handleImageClick = useCallback((product: Product) => {
        setCurrentImageProduct(product);
        setImagePopupOpen(true);
    }, []);

    return (
        <div className={`min-h-screen bg-[#fefaf1] text-[#2a4637] p-6 transition-filter duration-300 ${isImagePopupOpen ? 'blur-sm pointer-events-none' : ''}`}>
            <ProductsContext.Provider value={{
                table: products,
                pages: data.pages,
                setTableData: () => {},
            }}>

                <ProductHierarchy hierarchy={arrHierarchy}/>
                <FiltersAndSorting/>
                {message && (
                    <div
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 transform text-center bg-green-500 text-white text-lg font-bold py-2 px-6 rounded shadow-lg z-50 transition-transform duration-300 ease-in-out">
                        {message}
                    </div>
                )}

                {isLoading ? (
                    <p className="text-center text-gray-500 mt-20">Loading...</p>
                ) : isError ? (
                    <p className="text-center text-red-500 mt-20">{errorMsg}</p>
                ) : products && products.length > 0 ? (
                    <div className={"relative"}>
                        <ProductsCards/>
                        <div className="mt-6">
                            <PageNavigation/>
                        </div>
                    </div>
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
            </ProductsContext.Provider>

        </div>
    );

};
export default Store