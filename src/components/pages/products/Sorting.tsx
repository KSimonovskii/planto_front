import {paramsOfSorts} from "../../../utils/constants.ts";
import {getProductsTable} from "../../../features/api/productAction.ts";
import {useContext} from "react";
import {PageContext, ProductsContext} from "../../../utils/Context.ts";

const Sorting = () => {

    const {setProductsData} = useContext(ProductsContext);
    const {pageNumber, filters, setPage} = useContext(PageContext);

    const handleSelectSort = async (name: string) => {
        const currSort = paramsOfSorts.find((sort) => sort.name === name);
        if (!currSort) {
            return;
        }

        setPage((prevState) => ({...prevState, sort: currSort}));
        setProductsData(await getProductsTable(pageNumber, currSort, filters));
    }

    return (
        <div className={"flex justify-end w-2/5"}>
            <label className={"text-base-form flex items-center"} htmlFor={"sorting"}>
                Sort by:
                <select
                    id={"sorting"}
                    className={"inputField focus: border-base-form ml-2"}
                    onChange={(e) => handleSelectSort(e.target.value)}>
                    {paramsOfSorts.map((sort) => <option value={sort.name}
                                                         key={sort.name}>{sort.alias}</option>)}
                </select>
            </label>
        </div>

    )

}

export default Sorting