import {useContext, useMemo} from "react";
import {OrdersContext, PageContext} from "../../utils/context.ts";
import {useGetOrdersTableQuery} from "../../features/api/orderApi.ts";
import {getBodyForQueryGetTable} from "../../features/api/apiUtils.ts";
import {dataTypes} from "../../utils/enums/dataTypes.ts";
import Order from "../../features/classes/Order.ts";
import OrdersView from "./OrdersView.tsx";

const OrdersManager = () => {

    const {pageNumber, sort, filters} = useContext(PageContext);
    const {data = {orders: [], pages: 0}, isLoading, isError, error} = useGetOrdersTableQuery(getBodyForQueryGetTable(dataTypes.orders, pageNumber, sort, filters));

    const orders = useMemo(() => (
        data.orders.map((o: Order) => new Order(o.id, "", o.orderDate, o.status, 0))
        ),
        [data.orders]
    );

    if (isLoading) return <h2>Loading....</h2>
    if (isError) {
        let errorMsg = "";
        if ('status' in error) {
            errorMsg = `Error: ${error.status} - ${error.data}`;
        } else {
            errorMsg = "Unknown error";
        }
        return <h2>{errorMsg}</h2>
    }

    return (
        <div className={"col-span-6"}>
            <OrdersContext.Provider value={{
                table: orders,
                pages: data.pages,
                setTableData: () => {},
            }}>
                <OrdersView/>
            </OrdersContext.Provider>
        </div>

    )
}
export default OrdersManager;