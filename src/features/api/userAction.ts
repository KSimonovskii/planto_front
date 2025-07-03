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

export const getLoginFromToken = (token: string) => {
    if (!token) {
        return null;
    }
    try {
        const part = token.split('.');
        if (part.length !== 3) {
            console.error("Invalid JWT format. Token must have 3 parts");
            return null;
        }
        const payloadBase64 = part[1];
        console.log(payloadBase64);
        const decoderPayload = atob(payloadBase64);
        console.log(decoderPayload);
        const payloadObject = JSON.parse(decoderPayload);
        console.log(payloadObject)
        console.log(payloadObject.sub)

        if (payloadObject && payloadObject.sub) {
            return payloadObject.sub

        }
        console.warn("Login filed not found in JWT payload ");
        return null;
    } catch (e) {
        console.error("Faild to decode token: ", e);
        return null;
    }
}


