// export const getAllUsers = async (token: string) => {
//     const BASE_URL = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_USER_ENDPOINT}/users`;
//
//     const response = await fetch(BASE_URL, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//         credentials: "include"
//     });
//
//     if (!response.ok) {
//         throw new Error("Failed to fetch users");
//     }
//     return await response.json();
// };
