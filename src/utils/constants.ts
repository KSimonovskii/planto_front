

import {
    Home,
    Package,
    Store,
    ShoppingCart,
    Info,
    LogIn,
} from "lucide-react";

import type {NavItem} from "./types";

export const navItems: NavItem[] = [
    {title: 'Home', path: 'main', icon: Home, adminOnly: false},
    {title: 'About us', path: 'about', icon: Info, adminOnly: false},
    {title: 'Products', path: 'products', icon: Package, adminOnly: true},
    {title: 'Shopping cart', path: 'cart', icon: ShoppingCart, adminOnly: false},
    {title: 'My account', path: 'accountDashboard', icon: LogIn, adminOnly: false},
    {title: 'Store', path: 'store', icon: Store, adminOnly: false}
]

export const BASE_URL = "https://planto-gp2i.onrender.com"
// export const BASE_URL = "http://localhost:8080";