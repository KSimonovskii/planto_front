import {Decimal} from "decimal.js";

export class OrderItem {
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _priceUnit: Decimal;


    constructor(productId: string, name: string, quantity: number, priceUnit: Decimal) {
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._priceUnit = priceUnit;
    }


    get productId(): string {
        return this._productId;
    }

    set productId(value: string) {
        this._productId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    get priceUnit(): Decimal{
        return this._priceUnit;
    }

    set priceUnit(value: Decimal) {
        this._priceUnit = value;
    }
}