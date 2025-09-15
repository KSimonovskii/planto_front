import React from "react";
import type Product from "../../../../features/classes/Product.ts";



interface ProductsCardsProps {
    products: Product[];
    onAddToCart: (productId: string) => void;

}

const ProductsCards: React.FC<ProductsCardsProps> = ({
                                                         products,
                                                         onAddToCart,
                                                     }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-20">
                No products available.
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                        {/*image*/}
                        <div

                            className="w-full h-64 relative rounded-t-lg overflow-hidden"
                        >
                            <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="object-cover w-full h-full transform hover:scale-105 transition duration-300"
                            />
                            <div className="absolute top-4 right-4 w-6 h-5 bg-white/20 outline outline-2 outline-offset-[-1px] outline-lime-800 rounded-sm" />
                        </div>

                        {/*content*/}
                        <div className="flex flex-col flex-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-lime-800 text-lg md:text-xl font-bold font-['Rubik'] truncate">
                                    {p.name}
                                </div>
                                <div className="text-lime-800 text-lg md:text-xl font-bold font-['Rubik'] whitespace-nowrap">
                                    ₪ {p.price}
                                </div>
                            </div>

                            <button
                                onClick={() => onAddToCart(p.id)}
                                className="mt-auto bg-[#9acfaf] text-[#2a4637] font-semibold py-2 px-4 rounded-lg hover:bg-[#7aaa8d] transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsCards;
