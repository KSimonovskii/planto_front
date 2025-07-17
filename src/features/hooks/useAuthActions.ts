import {BASE_URL} from "../../utils/constants.ts";
import {useAuth} from "./useAuth.ts";

export const useAuthActions = () => {
    const {setToken} = useAuth();

    const loginUser = async (credentials:
                                 { login: string, password: string }) => {

        const URL = `${BASE_URL}/auth/login`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include" as RequestCredentials,
            body: JSON.stringify(credentials)
        }

        const response = await fetch(URL, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        const accessToken = data.accessToken;
        if (!accessToken) {
            throw new Error("Access token missing in response" + response.statusText);
        }

        setToken(accessToken);

    };
    return {loginUser};

};