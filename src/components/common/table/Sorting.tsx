import {DEFAULT_SORT, KINDS_OF_SORTING} from "../../../utils/constants.ts";
import {useContext} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import type {dataTypes} from "../../../utils/enums/dataTypes.ts";
import {getToInitialTableStates} from "../../../features/slices/tableStatesSlice.ts";
import {useDispatch} from "react-redux";

interface SortingProps {
    dataType: dataTypes,
    tableName: string
}

const Sorting = ({dataType, tableName} : SortingProps) => {

    const {setPage} = useContext(PageProductContext);
    const dispatch = useDispatch();

    let sorting = KINDS_OF_SORTING.get(dataType);
    if (!sorting) {
        sorting = [DEFAULT_SORT];
    }

    const handleSelectSort = async (name: string) => {
        const currSort = sorting.find((sort) => sort.name === name);
        if (!currSort) {
            return;
        }

        dispatch(getToInitialTableStates({tableName}));
        setPage((prevState) => ({...prevState, sort: currSort}));
    }

    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium whitespace-nowrap" htmlFor="sorting">
                Sort by:
            </label>
            <select
                id="sorting"
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50 transition"
                onChange={(e) => handleSelectSort(e.target.value)}>
                {sorting.map((sort) => <option value={sort.name} key={sort.name}>{sort.alias}</option>)}
            </select>
        </div>
    )
}

export default Sorting