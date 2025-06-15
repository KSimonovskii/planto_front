import type {Item} from './types'
import Product from "../Components/Product.ts";

export const navItems: Item[] = [
    {title: 'Main', path: 'main'},
    {title: 'Products', path: 'products'},
    {title: 'Users', path: 'users'},
]

export const Products: Product[] = [
    new Product(10,'Black Jam','Aloe',57,7),
    new Product(20, 'Briar Rose','Echeveria',11,35),
    new Product(30, 'Odetta','Echeveria',28,41),
    new Product(40, 'Retusa','Haworthia',2,22),
    new Product(50, 'Coral','Euphorbia',3,50)
]