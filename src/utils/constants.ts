import type {Item} from './types'


import {
    Home,
    Package,
    // ShoppingCart,
    // UserAccount,
    // BarChart3,
    // Settings,
    LogIn,

} from "lucide-react";

export const navItems: Item[] = [
    {title: 'Main', path: 'main', icon: Home},
    {title: 'Products', path: 'products', icon: Package},
    {title: 'My account', path: 'auth', icon: LogIn}
]

export const BASE_URL = "https://planto-gp2i.onrender.com"
// export const BASE_URL = "http://localhost:8080/product";