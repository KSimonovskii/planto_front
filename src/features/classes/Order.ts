export default class Order {
    private _id: string
    private _number: string
    private _orderDate: Date
    private _status: string
    private _amount: number

    constructor(id: string, number: string, date: Date, status: string, amount: number) {
        this._id = id;
        this._number = number;
        this._orderDate = date;
        this._status = status;
        this._amount = amount;
    }


    get id(): string {
        return this._id;
    }

    get number(): string {
        return this._number;
    }

    get orderDate(): Date {
        return this._orderDate;
    }

    get status(): string {
        return this._status;
    }

    get amount(): number {
        return this._amount;
    }
}