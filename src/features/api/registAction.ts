import {BASE_URL} from "../../utils/constants.ts";

export const registerUser = async (dataUser: {
    login: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}) => {
    const URL = `${BASE_URL}/account/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json()
}