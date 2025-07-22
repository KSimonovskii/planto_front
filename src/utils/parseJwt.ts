export function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        //todo delete
        console.log("RAW TOKEN in parseJwt --> ", token);
        console.log("DECODED BASE64 in parseJwt --> ", base64);
        console.log("JSON PAYLOAD (before parse) in parseJwt --> ", jsonPayload);

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Invalid JWT", e);
        return {};
    }
}
