import {type ReactNode, type SetStateAction, useCallback, useMemo, useState} from "react";
import type {PageProductsData} from "../../utils/types";
import {DEFAULT_SORT} from "../../utils/constants.ts";
import {PageContext} from "../../utils/Context.ts";

interface PageProviderProps {
    children: ReactNode;
}

export const PageProvider = ({children}: PageProviderProps) => {
    const [pageState, setPageState] = useState<PageProductsData>({
        pageNumber: 1,
        sort: DEFAULT_SORT,
        filters: [],
    });

    const setPage = useCallback((newPageData: SetStateAction<PageProductsData>) => {
        setPageState(prev => {
            if (typeof newPageData === 'function') {
                return newPageData(prev);
            }
            return newPageData;
        });
    }, []);

    const contextValue = useMemo(() => ({
        pageNumber: pageState.pageNumber,
        sort: pageState.sort,
        filters: pageState.filters,
        setPage: setPage,
    }), [pageState.pageNumber, pageState.sort, pageState.filters, setPage]);

    return (
        <PageContext.Provider value={contextValue}>
            {children}
        </PageContext.Provider>
    );
};