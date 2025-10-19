import {filterTypes} from "../../utils/enums/filterTypes.ts";
import type {FilterDto} from "../../utils/types";

export type filterValueType = string | number | null;

export default class Filter {
    private readonly _field: string;
    private readonly _type: filterTypes;
    private _typeValue: string;
    private _isChanged: boolean
    private _value?: filterValueType;
    private _valueFrom?: number | null;
    private _valueTo?: number | null;
    private _valueList: filterValueType[]


    constructor(field: string, type: filterTypes, typeValue: string,
                value: filterValueType = null,
                valueFrom: number | null = null,
                valueTo: number | null = null,
                valueList: filterValueType[] = []) {

        this._field = field;
        this._type = type;
        this._typeValue = typeValue;
        this._isChanged = false;
        this._value = value;
        this._valueFrom = valueFrom;
        this._valueTo = valueTo;
        this._valueList = valueList;
    }


    get field(): string {
        return this._field;
    }

    get type(): filterTypes {
        return this._type;
    }

    get value(): filterValueType | undefined {
        return this._value;
    }

    get valueFrom(): number | null | undefined  {
        return this._valueFrom;
    }

    get valueTo(): number | null | undefined  {
        return this._valueTo;
    }

    get valueList(): filterValueType[]  {
        return this._valueList;
    }

    get isChanged(): boolean {
        return this._isChanged;
    }

    set isChanged(value: boolean) {
        this._isChanged = value;
    }

    set value(value: filterValueType) {
        this._value = value;
    }

    set valueFrom(value: number | null) {
        this._valueFrom = value;
    }

    set valueTo(value: number | null) {
        this._valueTo = value;
    }

    set valueList(value: filterValueType[]) {
        this._valueList = value;
    }

    get typeValue(): string {
        return this._typeValue;
    }

    getCopy(updates: Partial<Filter>) : Filter {
        const newFilter = new Filter(updates.field? updates.field : this._field,
            updates.type? updates.type : this._type,
            updates.typeValue? updates.typeValue : this._typeValue,
            updates.value? updates.value : this._value,
            updates.valueFrom? updates.valueFrom : this.valueFrom,
            updates.valueTo? updates.valueTo : this.valueTo,
            updates.valueList? updates.valueList : this.valueList
        );

        newFilter.isChanged = (Object.keys(updates).length > 0);
        return newFilter;
    }

    getFilterDto() : FilterDto {
        return {
            field: this._field,
            type: this._type,
            typeValue: this._typeValue,
            isChanged: this.isChanged,
            value: this.field === "price" ? this.value?.toString() : this.value,
            valueFrom: this.field === "price" ? this.valueFrom?.toString() : this.valueFrom,
            valueTo: this.field === "price" ? this.valueTo?.toString() : this.valueTo,
            valueList: this.valueList
        }
    }
}

