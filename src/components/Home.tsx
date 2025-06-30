import { useEffect, useState } from "react";
import type Product from "./Product.ts";
import { getProductsTable } from "../features/api/productAction.ts";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="bg-[#fefaf1] text-[#2a4637] min-h-screen pt-24">
            {/* Hero section */}
            <section className="bg-[#e9f3e1] py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold mb-4">Planto</h1>
                    <p className="text-lg text-[#5e6e63]">Let it grow</p>
                </div>
                <img
                    src="/images/hero-plant.png"
                    alt="Succulent"
                    className="w-64 md:w-80"
                />
            </section>

            {/* Products section */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Products</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden text-center p-4 hover:shadow-md transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-24 h-24 object-contain mx-auto mb-4"
                                />
                                <h3 className="font-medium text-lg">{product.name}</h3>
                                <p className="text-gray-700 mt-1 mb-3">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button className="bg-[#f0e9db] text-[#2a4637] font-semibold py-2 px-4 rounded hover:bg-[#e7dcc8] transition">
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;
