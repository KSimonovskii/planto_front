export class Address {
    private _country: string;
    private _city: string;
    private _street: string;
    private _zip: string;
    private _houseNumber: string;
    private _apartmentNumber: string;


    constructor(country: string, city: string, street: string, zip: string, houseNumber: string, apartmentNumber: string) {
        this._country = country;
        this._city = city;
        this._street = street;
        this._zip = zip;
        this._houseNumber = houseNumber;
        this._apartmentNumber = apartmentNumber;
    }


    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get zip(): string {
        return this._zip;
    }

    set zip(value: string) {
        this._zip = value;
    }

    get houseNumber(): string {
        return this._houseNumber;
    }

    set houseNumber(value: string) {
        this._houseNumber = value;
    }

    get apartmentNumber(): string {
        return this._apartmentNumber;
    }

    set apartmentNumber(value: string) {
        this._apartmentNumber = value;
    }
}