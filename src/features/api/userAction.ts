import {BASE_URL} from "../../utils/constants.ts";

export const getUsersTable = async () => {
    const URL = `${BASE_URL}/account/users`;
    if (!URL) {
        throw new Error("URL not found in the settings!");
    }

    const token = localStorage.getItem("jwt");

    if (!token) {
        throw new Error("Token not found");
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await fetch(URL, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();

}

