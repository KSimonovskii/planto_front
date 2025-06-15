import type {Address} from "./Address.ts";
import type {Role} from "./Role.ts";
import type {Order} from "./Order.ts";

export default class User {
    private login: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password?: string;
    private address: Address;
    private role: Role[];
    private orders: Order[];

}