import Filters from "./Filters.tsx";
import Sorting from "../../common/table/Sorting.tsx";
import { dataTypes } from "../../../utils/enums/dataTypes.ts";

const FiltersAndSortingMobile = () => {
    return (
        <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-4">
            <Sorting dataType={dataTypes.products} tableName="store" />
            <Filters />
        </div>
    );
};

export default FiltersAndSortingMobile;
