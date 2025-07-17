import {OrderItem} from "./OrderItem.ts";
import {type OrderStatus} from "./OrderStatus.ts";

export class Order {
    private _id: string;
    private _items: OrderItem[];
    private _status: OrderStatus;
    private _orderDate: string;
    private _paymentMethod: string;
    private _paid: boolean


    constructor(id: string, items: OrderItem[], status: OrderStatus, orderDate: string, paymentMethod: string, paid: boolean) {
        this._id = id;
        this._items = items;
        this._status = status;
        this._orderDate = orderDate;
        this._paymentMethod = paymentMethod;
        this._paid = paid;
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    set items(value: OrderItem[]) {
        this._items = value;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(value: OrderStatus) {
        this._status = value;
    }

    get orderDate(): string {
        return this._orderDate;
    }

    set orderDate(value: string) {
        this._orderDate = value;
    }

   get paymentMethod(): string {
        return this._paymentMethod;
    }

    set paymentMethod(value: string) {
        this._paymentMethod = value;
    }

    get paid(): boolean {
        return this._paid;
    }

    set paid(value: boolean) {
        this._paid = value;
    }
}