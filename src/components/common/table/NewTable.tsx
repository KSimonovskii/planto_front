import {
    type ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    type Row,
    useReactTable,
} from '@tanstack/react-table'
import {useVirtualizer} from '@tanstack/react-virtual'
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import Product from "../../../features/classes/Product.ts";
import {SquarePen, Trash2} from "lucide-react";
import {EMPTY_PHOTO, SIZE_PAGE} from "../../../utils/constants.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {useDispatch} from "react-redux";
import {changeFlag} from "../../../features/slices/flagFilterOrSortChangeSlice.ts";


const NewTable = () => {
    const {sort, filters} = useContext(PageProductContext);
    const [fetchedTable, setFetchedTable] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const {isRefillTable, currentPage} = useAppSelector(state => state.flagFilterOrSortChange);

    const {
        data = {products: [], pages: 0, totalElements: 0},
              isFetching
    } = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, currentPage, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const columnHelper = createColumnHelper<Product>();

    useEffect(() => {
        if (isFetching) return;
        if (isRefillTable) {
            setFetchedTable(products.slice());
        } else {
            setFetchedTable((prev) => [...prev, ...products]);
        }
    }, [products]);

    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            {
                accessorKey: "imageUrl",
                header: "IMAGE",
                cell: (info) => <img
                    src={info.getValue() as string || EMPTY_PHOTO}
                    alt="image"
                    className={"w-full h-full object-cover border border-gray-200"}
                />,
                size: 64
            },
            {
                accessorKey: "name",
                header: "NAME",
                size: 200
            },
            {
                accessorKey: "quantity",
                header: "QUANTITY",
                size: 90
            },
            {
                accessorKey: "price",
                header: "PRICE",
                size: 70
            },
            {
                accessorKey: "description",
                header: "DESCRIPTION",
                size: 800
            },
            columnHelper.display({
                id: "actions",
                cell: () => (<div>
                    <SquarePen
                        // onClick={() => editProduct(product.id)}
                        className="w-5 h-5 text-gray-500 hover:text-lime-600 transition cursor-pointer"
                    />
                    <Trash2
                        // onClick={() => handleRemoveProduct(product.id)}
                        className="w-5 h-5 text-gray-500 hover:text-red-600 transition cursor-pointer"
                    /></div>)
            })
        ],
        []
    )

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
                    // && scrollHeight != clientHeight
                    && totalFetched < totalRow) {
                    dispatch(changeFlag({isChanged: false, currentPage: currentPage + 1}));
                }
            }
        }, [isFetching, totalFetched, totalRow, dispatch, currentPage]);

    const table = useReactTable({
        data: fetchedTable,
        columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true
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

    return (
        <div className={"m-4 text-center"}>
            {fetchedTable.length} of {totalRow} rows fetched
            <div
                className={"container border border-gray-400 m-4"}>
                <table className={"grid border-collapse border-spacing-0 w-full"}>
                    <thead className={"grid sticky top-0 z-1 bg-gray-400 w-full"}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr
                            key={headerGroup.id}
                            className={"flex w-full border-b border-gray-400"}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className={`flex border-b border-r border-gray-400 px-0.5 py-1 text-left`}
                                    style={{width: header.getSize()}}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext())
                                    }
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
                    <table className={"grid border-collapse border-spacing-0 w-full"}>
                        <tbody
                            className={`grid relative w-full`}
                            style={{width: rowVirtualizer.getTotalSize()}}>
                        {rowVirtualizer.getVirtualItems().map(virtualRow => {
                            const row = rows[virtualRow.index] as Row<Product>
                            return (
                                <tr
                                    data-index={virtualRow.index}
                                    ref={node => rowVirtualizer.measureElement(node)}
                                    key={row.id}
                                    className={`flex absolute w-full border-b border-gray-400 h-20`}
                                    style={{transform: `translateY(${virtualRow.start}px)`}}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={`flex`}
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