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
import {SIZE_PAGE} from "../../../utils/constants.ts";


const NewTable = () => {
    const {sort, filters} = useContext(PageProductContext);
    const [currentPage, setPage] = useState(1);
    const [fetchedTable, setFetchedTable] = useState<Product[]>([]);
    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, currentPage, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const columnHelper = createColumnHelper<Product>();

    useEffect(() => {
        if (data.products.length > 0) {
            const newProducts = data.products.map(
                (p: Product) =>
                    new Product(
                        p.id,
                        p.name,
                        p.category,
                        p.quantity,
                        p.price,
                        p.imageUrl,
                        p.description
                    )
            );
            setFetchedTable((prev) => [...prev, ...newProducts]);
        }
    }, [data.products]);

    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            // {
            //     accessorKey: "imageUrl",
            //     header: "IMAGE",
            //     size: 64
            // },
            {
                accessorKey: "name",
                header: "NAME",
                size: 200
            },
            {
                accessorKey: "quantity",
                header: "QUANTITY",
                size: 56
            },
            // {
            //     accessorKey: "price",
            //     header: "PRICE",
            //     size: 56
            // },
            // {
            //     accessorKey: "description",
            //     header: "DESCRIPTION"
            // },
            // columnHelper.display({
            //     id: "actions",
            //     cell: () => (<div>
            //         <SquarePen
            //         // onClick={() => editProduct(product.id)}
            //         className="w-5 h-5 text-gray-500 hover:text-lime-600 transition cursor-pointer"
            //         />
            //         <Trash2
            //             // onClick={() => handleRemoveProduct(product.id)}
            //             className="w-5 h-5 text-gray-500 hover:text-red-600 transition cursor-pointer"
            //         /></div>)
            // })
        ],
        []
    )

    const totalRow = data.pages * SIZE_PAGE;
    const totalFetched = fetchedTable.length;
    const borderMargin = 200;

    const getAdditionalRows = useCallback(
        (containerRefElement: HTMLDivElement | null) => {
            if (containerRefElement) {
                const {scrollHeight, scrollTop, clientHeight} = containerRefElement;
                if (scrollHeight - scrollTop - clientHeight < borderMargin
                    && totalFetched < totalRow) {
                    setPage((prevState) => Math.min(prevState++, data.pages));
                }
            }
        }, [setPage, data.pages, totalFetched, totalRow]);

    useEffect(() => {
        getAdditionalRows(tableContainerRef.current);
    }, [getAdditionalRows]);

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
        <div
        className={"container overflow-auto relative h-[600px]"}
        onScroll={e => getAdditionalRows(e.currentTarget)}
        ref={tableContainerRef}>
            <table className={"grid"}>
                <thead className={"grid sticky top-0 z-1"}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}
                        className={"flex w-full"}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className={`flex size-[${header.getSize()}px]`}>
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
                <tbody className={`grid relative h-[${rowVirtualizer.getTotalSize()}px]`}>
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const row = rows[virtualRow.index] as Row<Product>
                    return (
                        <tr
                            data-index={virtualRow.index}
                            ref={node => rowVirtualizer.measureElement(node)}
                            key={row.id}
                            className={`flex absolute w-full translate-y-[${virtualRow.start}px]`}>
                            {
                                row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className={`flex w-[${cell.column.getSize()}]`}>
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
    );
};

export default NewTable;