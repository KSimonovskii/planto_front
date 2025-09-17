// export interface LocalCartItem {
//     productId: string;
//     quantity: number;
// }
//
// const LOCAL_CART_KEY = "localCart";
//
//
// export const getLocalCart = (): LocalCartItem[] => {
//     try {
//         const data = localStorage.getItem(LOCAL_CART_KEY);
//         return data ? JSON.parse(data) as LocalCartItem[] : [];
//     } catch {
//         return [];
//     }
// };
//
// const saveLocalCart = (cart: LocalCartItem[]) => {
//     localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
// };
//
// export const addToLocalCart = (item: LocalCartItem) => {
//     const cart = getLocalCart();
//     const existing = cart.find((c) => c.productId === item.productId);
//
//     if (existing) {
//         existing.quantity += item.quantity;
//     } else {
//         cart.push(item);
//     }
//
//     saveLocalCart(cart);
// };
//
// export const removeFromLocalCart = (productId: string) => {
//     const cart = getLocalCart().filter((item) => item.productId !== productId);
//     saveLocalCart(cart);
// };
//
// export const clearLocalCart = () => {
//     localStorage.removeItem(LOCAL_CART_KEY);
// };
//
// export const isInLocalCart = (productId: string): boolean => {
//     return getLocalCart().some((item) => item.productId === productId);
// };
//
// export const getLocalCartCount = (): number => {
//     return getLocalCart().reduce((sum, item) => sum + item.quantity, 0);
// };
