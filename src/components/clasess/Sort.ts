export default class Sort {
    private _name: string
    private _field: string
    private _direction: number
    private _alias: string


    constructor(name: string, field: string, direction: number, alias: string) {
        this._name = name
        this._field = field;
        this._direction = direction;
        this._alias = alias;
    }


    get field(): string {
        return this._field;
    }

    get direction(): number {
        return this._direction;
    }

    get alias(): string {
        return this._alias;
    }

    get name(): string {
        return this._name;
    }
}