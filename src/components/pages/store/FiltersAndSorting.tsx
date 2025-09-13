import {SearchBar} from "../../filters/SearchBar.tsx";
import Sorting from "../../common/table/Sorting.tsx";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import {Filters} from "../../filters/Filters.tsx";

const FiltersAndSorting = () => {

    // <div
    //     className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
    //     <div className="w-full sm:w-1/3">
    //         <SearchBar/>
    //     </div>
    //     <div className="w-full sm:w-1/3">
    //         <Sorting dataType={dataTypes.products}/>
    //     </div>
    //     <div className="w-full sm:w-1/3">
    //         <Filters/>
    //     </div>
    // </div>

    return (
        <div>
            <div className="w-64 pr-4 py-4 inline-flex justify-start items-center gap-8">
                <div className="flex justify-start items-center gap-2">
                    <div className="justify-start text-lime-800 text-base font-bold font-['Rubik']">Filters</div>
                    <div className="w-3 h-1.5 bg-lime-800" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div className="justify-start text-lime-800 text-base font-bold font-['Rubik']">Sort by</div>
                    <div className="w-3 h-1.5 bg-lime-800" />
                </div>
            </div>

        </div>
    );
};

export default FiltersAndSorting;