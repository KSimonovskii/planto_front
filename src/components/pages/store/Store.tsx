import {useEffect, useState} from "react";
import type Product from "../products/Product.ts";
import {getProductsTable} from "../../../features/api/productAction.ts";
import {ArrowUp} from "lucide-react";
import {useCartActions} from "../../../features/hooks/useCartAction.ts"; // если используешь lucide-react


const Store = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const {addToCart, message} = useCartActions();

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

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (


        <div className="h-screen p-6 bg-[#fefaf1] text-[#2a4637] relative">
            <h2 className="text-3xl font-bold mb-4 text-center">Store</h2>

            {message && (
                <div className="text-center text-green-600 text-lg font-bold py-2 px-6 rounded shadow-lg z-50">{message}</div>
            )}

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-y-auto h-[80vh] pr-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden text-center p-4 hover:shadow-md transition flex flex-col items-center"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-32 h-32 object-contain mb-4"
                                />
                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {product.price.toFixed(2)}

                                </p>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="bg-[#9acfaf] text-[#2a4637] font-semibold py-2 px-4 rounded hover:bg-[#7aaa8d] transition"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[#9acfaf] text-[#2a4637] p-3 rounded-full shadow-lg hover:bg-[#7aaa8d] transition"
                    aria-label="Scroll to top"
                >
                    <ArrowUp/>
                </button>
            )}
        </div>
    );
};

export default Store;
