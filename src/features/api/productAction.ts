import Product from "../classes/Product.ts";

export const getProductById = async (productId: string): Promise<Product> => {
    const BASE_URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}`;
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) throw new Error("Product not found");
    return await response.json();
};

