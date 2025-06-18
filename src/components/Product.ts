export default class Product {

    private readonly _id: string
    private _name: string
    private _category: string
    private _quantity: number
    private _price: number

    constructor(id: string, name: string, category: string, quantity: number, price: number) {
        this._id = id;
        this._name = name;
        this._category = category;
        this._quantity = quantity;
        this._price = price;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get category(): string {
        return this._category;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }


    set name(value: string) {
        this._name = value;
    }

    set category(value: string) {
        this._category = value;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    set price(value: number) {
        this._price = value;
    }
}