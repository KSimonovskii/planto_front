import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {PageProductContext, ProductsContext} from "../../../utils/context.ts";
import {useCartActions} from "../../../features/hooks/useCartAction.ts";
import Product from "../../../features/classes/Product.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import ProductHierarchy from "./ProductHierarchy.tsx";
import FiltersAndSorting from "./FiltersAndSorting.tsx";
import {useMatch} from "react-router";
import spinner from "../../../assets/spinner2.png";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import ImagePopup from "../../common/ImagePopup.tsx";
import ProductCard from "../products/ProductCard.tsx";
import {changeFlag} from "../../../features/slices/flagFilterOrSortChangeSlice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";

const Store = () => {
    const {sort, filters} = useContext(PageProductContext);

    const {addToCart, addToLocalCart, getCart, isInCart, isInLocalCart} = useCartActions();
    const {refreshCart} = useCartContext();
    const {isAuthenticated} = useCurrentUser();

    const [errorMsg, setError] = useState<string | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const [currentImageProduct] = useState<Product | null>(null);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const match = useMatch("/store/*");
    const params: string = match?.params["*"] ?? "";
    const arrHierarchy = params ? params.split("/") : [];

    const dispatch = useDispatch();
    const {isRefillTable, currentPage} = useAppSelector(state => state.flagFilterOrSortChange);

    const {data = {products: [], pages: 0}, isLoading, isFetching, isError, error} = useGetProductsTableRTKQuery(
        getBodyForQueryGetTable(dataTypes.products, currentPage, sort, filters)
    );

    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            getCart();
        }
    }, [isAuthenticated, getCart]);

    useEffect(() => {
        if (isFetching) {
            console.log("Store: currently fetching, skip merging");
            return;
        }

        console.log('Store: productsReceived', {
            currentPage,
            productsCount: products.length,
            isRefillTable
        });

        if (isRefillTable) {
            setAllProducts(products.slice());
        } else {
            setAllProducts(prev => {
                const existingIds = new Set(prev.map(p => p.id));
                const newItems = products.filter(p => !existingIds.has(p.id));
                if (newItems.length === 0) {
                    return prev;
                }
                return [...prev, ...newItems];
            });
        }
    }, [products, isRefillTable, isFetching, currentPage]);


    useEffect(() => {
        if (!observerRef.current) return;
        if (currentPage >= data.pages) {
            console.log("Store: reached last page", currentPage, data.pages);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log('Store: observer intersect, request next page', currentPage + 1);
                    dispatch(changeFlag({isChanged: false, currentPage: currentPage + 1}));
                }
            },
            {
                root: null,
                rootMargin: "400px",
                threshold: 0.1
            }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [data.pages, currentPage, dispatch]);

    const handleAddToCart = useCallback(
        async (productId: string) => {
            if (!isAuthenticated) {
                try {
                    addToLocalCart(productId);
                    await refreshCart();
                } catch (err: unknown) {
                    if (err instanceof Error) setError(err.message);
                }
                return;
            }
            try {
                await addToCart(productId);
                await refreshCart();
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
            }
        },
        [isAuthenticated, addToCart, refreshCart, addToLocalCart]
    );

    return (
        <div className="min-h-screen bg-white text-[#2a4637] p-6">

            <ProductsContext.Provider
                value={{
                    table: products, pages: data.pages, setTableData: () => {
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
                ) : allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                        {allProducts.map((product: Product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                isInCart={isInCart(product.id) || isInLocalCart(product.id)}
                                onOpen={() => navigate(`/product/${product.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-20">
                        No products found.
                    </div>
                )}

                <div ref={observerRef} className="w-full h-6"/>

                {isFetching && allProducts.length > 0 && (
                    <div className="flex justify-center items-center mt-4">
                        <img src={spinner} alt="loading..." className="spinner-icon"/>
                    </div>
                )}

                {isError && (
                    <p className="text-center text-red-500 mt-4">
                        {(typeof error === `object`) && 'status' in error ? `Error: ${error.status} - ${error.data}` : "Unknown error"}
                    </p>
                )}

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
