import Filters from "./Filters.tsx";
import Sorting from "../../common/table/Sorting.tsx";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";

const FiltersAndSorting = () => {
    return (
            <div className="w-128 h-16 relative bg-white rounded-lg overflow-hidden">
                <div className="w-128 pr-4 py-4 left-0 top-0 absolute inline-flex justify-start items-center gap-8">
                    <Filters/>
                    <Sorting dataType={dataTypes.products}/>
                </div>
            </div>
    );
};

export default FiltersAndSorting;