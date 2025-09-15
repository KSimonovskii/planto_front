import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {PageProductContext, ProductsContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import Product from "../../../features/classes/Product.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import AuthPromptModal from "../../common/AuthPromptModal.tsx";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import ProductHierarchy from "./ProductHierarchy.tsx";
import FiltersAndSorting from "./FiltersAndSorting.tsx";
import {useMatch} from "react-router";
import spinner from "../../../assets/spinner2.png";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import {useTranslation} from "react-i18next";
import ImagePopup from "../../common/ImagePopup.tsx";

const Store = () => {
    const {sort, filters} = useContext(PageProductContext);

    const {addToCart, isInCart} = useCartActions();
    const {refreshCart} = useCartContext();
    const {isAuthenticated} = useCurrentUser();
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMsg, setError] = useState<string | null>(null);
    const [isAuthModalVisible, setAuthModalVisible] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const openAuthModal = () => setAuthModalVisible(true);
    const closeAuthModal = () => setAuthModalVisible(false);

    const [currentImageProduct] = useState<Product | null>(null);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const match = useMatch("/store/*");
    let params = "";
    if (match) params = match.params["*"];
    const arrHierarchy = params ? params.split("/") : [];

    const { data = { products: [], pages: 0 }, isLoading, isError, error } =
        useGetProductsTableRTKQuery(
            getBodyForQueryGetTable(dataTypes.products, currentPage, sort, filters)
        );

    useEffect(() => {
        if (data.products.length > 0) {
            const newProducts = data.products.map(
                (p: Product) =>
                    new Product(
                        p.id,
                        p.name,
                        p.category,
                        p.quantity,
                        p.price,
                        p.imageUrl,
                        p.description
                    )
            );
            setAllProducts((prev) => [...prev, ...newProducts]);
        }
    }, [data.products]);

    useEffect(() => {
        if (!observerRef.current || currentPage >= data.pages) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage((prev) => Math.min(prev + 1, data.pages));
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [data.pages, currentPage]);

    const handleAddToCart = useCallback(
        async (productId: string) => {
            if (!isAuthenticated) {
                openAuthModal();
                return;
            }
            try {
                await addToCart(productId);
                await refreshCart();
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
            }
        },
        [isAuthenticated, addToCart, refreshCart]
    );



    return (
        <div className="min-h-screen bg-white text-[#2a4637] p-6">
            <ProductsContext.Provider
                value={{
                    table: allProducts, pages: data.pages, setTableData: () => {
                    }
                }}
            >
                <ProductHierarchy hierarchy={arrHierarchy}/>
                <FiltersAndSorting/>


                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-64">
                        <img src={spinner} alt="loading..." className="spinner-icon"/>
                    </div>
                ) : isError ? (
                    <p className="text-center text-red-500 mt-20">{errorMsg}</p>
                ) :

                    allProducts && allProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                            {allProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="w-72 h-[430px] inline-flex flex-col justify-start items-start gap-2"
                                >
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
                            ))}
                        </div>

                    </>
                ) : (
                    <div className="text-center text-gray-500 mt-20">
                        No products found.
                    </div>
                )}




                <div ref={observerRef} className="w-full h-6" />

                {isLoading && (
                    <div className="flex justify-center items-center mt-4">
                        <img src={spinner} alt="loading..." className="spinner-icon" />
                    </div>
                )}

                {isError && (
                    <p className="text-center text-red-500 mt-4">
                        {error ? ("status" in error ? `Error: ${error.status} - ${error.data}` : "Unknown error") : "Unknown error"}
                    </p>
                )}

                <AuthPromptModal isOpen={isAuthModalVisible} onClose={closeAuthModal} />
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

export default Store;
