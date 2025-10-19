import {SearchBar} from "../../../../filters/SearchBar.tsx";
import {FiltersAdmin} from "../../../../filters/Filters.admin.tsx";

import Sorting from "../../../../common/table/Sorting.tsx";
import {dataTypes} from "../../../../../utils/enums/dataTypes.ts";
import NewTable from "../../../../common/table/tan-stack-table/NewTable.tsx";

const ProductsView = () => {



    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                    <SearchBar/>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Sorting dataType={dataTypes.products} tableName={"products"}/>
                    <FiltersAdmin/>
                </div>

                <div className="md:hidden flex flex-col gap-4 w-full">
                    <Sorting dataType={dataTypes.products} tableName={"products"}/>
                    <FiltersAdmin/>
                </div>
            </div>

            {/*<ProductsTable/>*/}
            <NewTable/>

        </div>
    )
}

export default ProductsView
