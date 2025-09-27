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
        <form className="flex w-full gap-2">
            <input
                type="search"
                name="searchField"
                className="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50 transition"
                placeholder="Find product by name..."
                value={strSearch}
                onChange={(e) => handleChangeSearch(e.target.value)}
            />
            <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-lime-600 hover:bg-lime-800 text-white font-medium transition"
                onClick={(e) => handlerClickSearch(e, strSearch)}
            >
                Search
            </button>
        </form>
    )
}
