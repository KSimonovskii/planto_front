import {BASE_URL} from "../../utils/constants.ts";
import {getLoginFromToken} from "./userAction.ts";

export const getCart = async (): Promise<{ productId: string; quantity: number }[]> => {
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("Token not found");

    const userLogin = getLoginFromToken(token);
    const URL = `${BASE_URL}/account/user/${userLogin}`;

    const response = await fetch(URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    const data = await response.json();
    return data.cart;
};


export const addToCart = async (productId: string) => {

    const token = localStorage.getItem("jwt");
    if (!token) {
        throw new Error("Token not found");
    }

    const userLogin = getLoginFromToken(token);
    if (!userLogin) {
        throw new Error("Login not found in token");
    }

    const URL = `${BASE_URL}/account/user/${userLogin}/cart/${productId}`;
    if (!URL) {
        throw new Error("URL error");
    }

    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

export const removeFromCart = async (productId: string) => {

    const token = localStorage.getItem("jwt");
    if (!token) {
        throw new Error("Token not found");
    }

    const userLogin = getLoginFromToken(token);
    if (!userLogin) {
        throw new Error("Login not found in token");
    }

    const URL = `${BASE_URL}/account/user/${userLogin}/cart/${productId}`;
    if (!URL) {
        throw new Error("URL error");
    }

    const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}
