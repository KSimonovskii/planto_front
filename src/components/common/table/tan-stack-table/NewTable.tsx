import {
    flexRender,
    getCoreRowModel,
    type Row,
    useReactTable,
} from '@tanstack/react-table'
import {useVirtualizer} from '@tanstack/react-virtual'
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {PageProductContext} from "../../../../utils/context.ts";
import {useGetProductsTableRTKQuery} from "../../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../../utils/enums/dataTypes.ts";
import Product from "../../../../features/classes/Product.ts";
import {SIZE_PAGE} from "../../../../utils/constants.ts";
import {useAppSelector} from "../../../../app/hooks.ts";
import {useDispatch} from "react-redux";
import {changeFlag, getToInitialTableStates} from "../../../../features/slices/tableStatesSlice.ts";
import ProductsColumns from "./ProductsColumns.tsx";


const NewTable = () => {
    const {sort, filters} = useContext(PageProductContext);
    const [fetchedTable, setFetchedTable] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const {isRefillTable, currentPage} = useAppSelector(state => state.tableStates.products);
    useEffect(() => {
        const resetState = () => {
            dispatch(getToInitialTableStates({tableName: "products"}));
        }

        resetState();
    }, []);

    const {data = {products: [], pages: 0, totalElements: 0}, isFetching} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, currentPage, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    const tableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFetching) return;
        if (isRefillTable) {
            setFetchedTable(products.slice());
        } else {
            setFetchedTable((prev) => [...prev, ...products]);
        }
    }, [products, isFetching, isRefillTable]);

    const columns = useMemo(
        () => ProductsColumns(),
        []);

    const totalRow = data.totalElements;
    const totalFetched = fetchedTable.length;
    const borderMargin = 200;

    const getAdditionalRows = useCallback(
        (containerRefElement: HTMLDivElement | null) => {
            if (containerRefElement) {
                console.log(containerRefElement.scrollTop);
                if (isFetching) return;
                const {scrollHeight, scrollTop, clientHeight} = containerRefElement;
                if (scrollHeight - scrollTop - clientHeight < borderMargin
                    && totalFetched < totalRow) {
                    dispatch(changeFlag({tableName: "products", changes: {isRefillTable: false, currentPage: currentPage + 1}}));
                }
            }
        }, [isFetching, totalFetched, totalRow, dispatch, currentPage]);

    const table = useReactTable({
        data: fetchedTable,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        columnResizeMode: "onChange",
        enableColumnResizing: true
    })

    const {rows} = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => SIZE_PAGE,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
        typeof window !== 'undefined' &&
            navigator.userAgent.indexOf('Firefox') === -1
            ? element => element?.getBoundingClientRect().height
            : undefined,
        overscan: 5,
    })

    const getTailwindClassById = (id: string) => {
        switch (id) {
            case "name": return "flex items-center px-6 py-4 whitespace-nowrap font-medium text-gray-900";
            default: return "flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500";
        }
    }

    return (
        <div className={"m-4 text-center"}>
            {fetchedTable.length} of {totalRow} rows fetched
            <div
                className={"container rounded-lg shadow-md m-4"}>
                <table className={"grid border-collapse border-spacing-0 w-full divide-y divide-gray-200 table-fixed"}>
                    <thead className={"grid sticky top-0 z-1 bg-gray-50 w-full text-gray-500 uppercase"}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr
                            key={headerGroup.id}
                            className={"flex w-full"}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className={`flex relative border border-gray-200 px-6 py-3 justify-start text-xs font-bold text-gray-500 uppercase tracking-wider`}
                                    style={{width: header.getSize()}}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext())
                                    }
                                    <div
                                        className={"absolute opacity-0 top-0 right-0 h-full w-1 bg-gray-400 cursor-col-resize rounded-md touch-none select-none"}
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}>
                                    </div>
                                </th>
                            ))
                            }
                        </tr>
                    ))}
                    </thead>
                </table>
                <div
                    className={"relative overflow-y-scroll h-[600px]"}
                    ref={tableContainerRef}
                    onScroll={e => getAdditionalRows(e.currentTarget)}>
                    <table className={"grid w-full divide-y divide-gray-200"}>
                        <tbody
                            className={`grid relative w-full divide-y divide-gray-200`}>
                        {rowVirtualizer.getVirtualItems().map(virtualRow => {
                            const row = rows[virtualRow.index] as Row<Product>
                            return (
                                <tr
                                    data-index={virtualRow.index}
                                    ref={node => rowVirtualizer.measureElement(node)}
                                    key={row.id}
                                    className={`flex absolute w-full border-y border-gray-200
                                                ${row.index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                                transition-colors duration-200 ease-in-out`}
                                    style={{transform: `translateY(${virtualRow.start}px)` }}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={getTailwindClassById(cell.column.id)}
                                                style={{width: cell.column.getSize()}}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default NewTable;