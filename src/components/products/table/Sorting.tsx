import {DEFAULT_SORT, KINDS_OF_SORTING} from "../../../utils/constants.ts";
import {useContext} from "react";
import {PageContext} from "../../../utils/context.ts";
import type {dataTypes} from "../../../utils/enums/dataTypes.ts";

interface SortingProps {
    dataType: dataTypes;
}

const Sorting = ({dataType} : SortingProps) => {

    const {setPage} = useContext(PageContext);

    let sorting = KINDS_OF_SORTING.get(dataType);
    if (!sorting) {
       sorting = [DEFAULT_SORT];
    }

    const handleSelectSort = async (name: string) => {
        const currSort = sorting.find((sort) => sort.name === name);
        if (!currSort) {
            return;
        }

        setPage((prevState) => ({...prevState, sort: currSort}));
    }

    return (
        <div className={"flex justify-end w-2/5"}>
            <label className={"text-base-form flex items-center"} htmlFor={"sorting"}>
                Sort by:
                <select
                    id={"sorting"}
                    className={"inputField focus: border-base-form ml-2"}
                    onChange={(e) => handleSelectSort(e.target.value)}>
                    {sorting.map((sort) => <option value={sort.name}
                                                                   key={sort.name}>{sort.alias}</option>)}
                </select>
            </label>
        </div>

    )

}

export default Sorting