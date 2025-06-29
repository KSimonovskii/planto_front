import type {Address} from "./Address.ts";
import {type UserRole} from "./UserRole.ts";
import  {type Order} from "./Order.ts";

export default class UserAccount {
    private _login: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _address: Address;
    private _role: UserRole[];
    private _orders: Order[];


    constructor(login: string, firstName: string, lastName: string, email: string, password: string, address: Address, role: UserRole[], orders: Order[]) {
        this._login = login;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._address = address;
        this._role = role;
        this._orders = orders;
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

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get address(): Address {
        return this._address;
    }

    set address(value: Address) {
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
}