import {BASE_URL} from "../../utils/constants.ts";

export const loginUser = async (credentials:
                                    {username:string,password:string})=> {
    const URL = `${BASE_URL}/account/login`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok){
        throw new Error(response.statusText);
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem('jwt', token);
    return data;
}