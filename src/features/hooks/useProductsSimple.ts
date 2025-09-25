import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../../app/hooks.ts";


export function useProductsQuantity() {
    const { accessToken } = useAppSelector(state => state.userAuthSlice);
    const [quantity, setQuantity] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PRODUCT_ENDPOINT}/quantity`;

    const fetchQuantity = useCallback(async () => {

        if (!accessToken) {
            console.log("Waiting for access token...");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, {method: "GET"});
            if (!response.ok) {
                throw new Error("Failed to fetch product quantity");
            }

            const data = await response.json();
            setQuantity(data);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, [url, accessToken]);

    useEffect(() => {
        fetchQuantity();
    }, [fetchQuantity]);

    return { quantity, error, loading, refetch: fetchQuantity };
}
