import {useAuth} from "./useAuth.ts";

export const useAuthActions = () => {
    const {setAccessToken} = useAuth();

    const loginUser = async (credentials:
                                 { login: string, password: string }) => {

        const URL = "https://planto-gp2i.onrender.com/auth/login";
        // const URL = `${import.meta.env.VITE_BASE_URL}/auth/login`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include" as RequestCredentials,
            body: JSON.stringify(credentials)
        }
        try {
            const response = await fetch(URL, options);

            if (!response.ok) {
                let errorMessage = `Login failed: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (e) {
                    console.warn(e)
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const accessToken = data.accessToken;

            if (!accessToken) {
                throw new Error("Access token missing in response from login.");
            }
            setAccessToken(accessToken);
            console.log("Login successful. Access token set.");
            return {accessToken};

        } catch (error) {
            console.error("Error during login:", error);
            setAccessToken(null);
            throw error;
        }
    };

    return {loginUser};
};
