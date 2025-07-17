import type {Address} from "./Address.ts";
import {type UserRole} from "./UserRole.ts";
import  {type Order} from "../orders/Order.ts";
import type {CartItem} from "../orders/CartItem.ts";



export default class UserAccount {
    private _login: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _address: Address | null;
    private _role: UserRole[];
    private _orders: Order[];
    private _cart: CartItem[];


    constructor(login: string, firstName: string, lastName: string, email: string, address: Address | null, role: UserRole[], orders: Order[], cart: CartItem[]) {
        this._login = login;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._address = address;
        this._role = role;
        this._orders = orders;
        this._cart = cart;
    }


    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get address(): Address | null {
        return this._address;
    }

    set address(value: Address | null) {
        this._address = value;
    }

    get role(): UserRole[] {
        return this._role;
    }

    set role(value: UserRole[]) {
        this._role = value;
    }

    get orders(): Order[] {
        return this._orders;
    }

    set orders(value: Order[]) {
        this._orders = value;
    }

    get cart(): CartItem[] {
        return this._cart;
    }

    set cart(value: CartItem[]) {
        this._cart = value;
    }
}