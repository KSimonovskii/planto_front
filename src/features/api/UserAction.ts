import {BASE_URL} from "../../utils/constants.ts";


export const getUser = async (login: string) => {
    const URL = BASE_URL + "/account/users" + {login};
    if (!URL) {
        throw new Error("URL not found in the settings!");
    }

    const options = {
        method: "GET",
    }

    const response = await fetch(URL, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}


export const removeUserFromTable = async (login: string) => {
    const URL = {BASE_URL} + "/account/user/" + {login};
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers: headers
    }

    const response = await fetch(URL, options);
    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    return await response.json();

}