import type {ProductData, ProductDataForTable} from "../../utils/types";

export default class Product {

    private readonly _id: string
    private _name: string
    private _category: string
    private _quantity: number
    private _price: number
    private _imageUrl?: string
    private _description?: string


    constructor(id: string, name: string, category: string, quantity: number, price: number, imageUrl?: string, description?: string) {
        this._id = id;
        this._name = name;
        this._category = category;
        this._quantity = quantity;
        this._price = price;
        this._imageUrl = imageUrl;
        this._description = description;
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

    get imageUrl(): string {
        return this._imageUrl ? this._imageUrl : "";
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get description(): string {
        return this._description ? this._description : "";
    }

    set description(value: string) {
        this._description = value;
    }

    getProductData() : ProductData{
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            qty: this.quantity,
            price: this.price,
            imageUrl: this.imageUrl,
            description: this.description,
            imageFile: null
        }
    }

    getProductDataForTable() : ProductDataForTable{
        return {
            imageUrl: this.imageUrl,
            name: this.name,
            category: this.category,
            qty: this.quantity,
            price: this.price,
            description: this.description,
        }
    }
}