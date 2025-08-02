import type {OrderCreateDto} from "../../dto/OrderCreateDto.ts";
import {BASE_URL} from "../../utils/constants.ts";
import {secureFetch} from "../../utils/secureFetch.ts";



export const createOrderApi = async (
    login: string,
    orderData: OrderCreateDto,
    getToken: () => string | null,
    setAccessToken: (token: string | null) => void,
    ) => {

    const url = `${BASE_URL}/order/create/${login}`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderData)
    };

    const response = await secureFetch(url, options, getToken, setAccessToken);

    if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
    }
    return await response.json();
};