import {useContext, useState} from "react";
import {FILTER_NAME} from "../../utils/constants.ts";
import {PageProductContext} from "../../utils/context.ts";

export const SearchBar = () => {

    const {filters, setPage} = useContext(PageProductContext);

    const [strSearch, setSearch] = useState("");
    const [filterName, setFilterName] = useState(FILTER_NAME);

    const handleChangeSearch = (inputString: string) => {
        setSearch(inputString);
        if (!inputString) {
            setPageWithSearch(inputString);
        }
    }

    const handlerClickSearch = (e: React.MouseEvent<HTMLButtonElement>, inputString : string) => {
        e.preventDefault();
        setPageWithSearch(inputString);
    }

    const setPageWithSearch = (inputString: string) => {

        const filterSearch = filterName.getCopy({value: inputString});

        const newFilters = filters.slice();
        const index = newFilters.findIndex((filter) => filter.field.toLowerCase() == "name");

        if (!inputString) {
            if (index >= 0) {
                newFilters.splice(index, 1);
            }
        } else if (index >= 0) {
            newFilters[index] = filterSearch;
        } else {
            newFilters.push(filterSearch);
        }

        setFilterName(filterSearch);
        setPage((prevState) => ({...prevState, filters: newFilters}));

    }

    return (
        <>
            <form className={"flex flex-row justify-around space-x-1 w-full"}>
                <input
                    type={"search"}
                    name={"searchField"}
                    className={"inputField my-0 w-full"}
                    placeholder={"Find product by name.."}
                    value={strSearch}
                    onChange={(e) => handleChangeSearch(e.target.value)}/>
                <button className={"button w-20"} onClick={(e) => handlerClickSearch(e, strSearch)}>Search</button>
            </form>
        </>
    )
}