import type {Item} from './types'


import {
    Home,
    Package,
    Store,
    ShoppingCart,
    Info,
    LogIn,


} from "lucide-react";

export const navItems: Item[] = [
    {title: 'Home', path: 'main', icon: Home},
    {title: 'About us', path: 'about', icon: Info},
    {title: 'Products', path: 'products', icon: Package},
    {title: 'My orders', path: 'orders', icon: ShoppingCart},
    {title: 'My account', path: 'auth', icon: LogIn},
    {title: 'Store', path: 'store', icon: Store}
]

export const BASE_URL = "https://planto-gp2i.onrender.com"
// export const BASE_URL = "http://localhost:8080/product";