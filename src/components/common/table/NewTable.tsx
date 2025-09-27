import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {useContext, useMemo, useRef} from "react";
import {PageProductContext} from "../../../utils/context.ts";
import {useGetProductsTableRTKQuery} from "../../../features/api/productApi.ts";
import {getBodyForQueryGetTable} from "../../../features/api/apiUtils.ts";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";
import Product from "../../../features/classes/Product.ts";

const StoreTable = () => {
    const {sort, filters, pageNumber} = useContext(PageProductContext);
    const {data = {products: [], pages: 0}, isLoading, isError, error} = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, 1, sort, filters));
    const products = useMemo(() => {
            return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
        },
        [data.products]
    )

    const tableContainerRef = useRef<HTMLDivElement>(null);

    const columns = useMemo<ColumnDef[]>(
        () => [
            {
                accessorKey

            }
        ]
    )

    return (
        <div>


        </div>
    );
};

export default StoreTable;