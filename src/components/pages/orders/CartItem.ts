export class CartItem {
    private _productId: string;
    private _quantity: number;

    constructor(productId: string, quantity: number) {
        this._productId = productId;
        this._quantity = quantity;
    }

    get productId(): string {
        return this._productId;
    }

    set productId(value: string) {
        this._productId = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }
}
