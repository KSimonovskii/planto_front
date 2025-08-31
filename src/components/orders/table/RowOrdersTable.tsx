import {useContext} from "react";
import {OrdersContext} from "../../../utils/context.ts";
import type Order from "../../../features/classes/Order.ts";
import {SquarePen, Trash2} from "lucide-react";
import {format} from "date-fns";

interface OrderProps {
    order: Order
}

const RowOrdersTable = ({order} : OrderProps) => {

    const {table} = useContext(OrdersContext);

    const editDataInRow = (id: string) => {
        const index = table.findIndex((element) => element.id === id);
        if (index >= 0){
            //setIdEditRow(id);
        }
    }

    const handleRemoveRow = async (id: string) => {
        const id2 = id;
        //removeData(id);
    }

    return (
        <tr className={"hover:bg-light-orange hover:text-alt-text"}>
            <th className={"pl-2 font-normal w-70"}>{order.id}</th>
            <th className={"font-normal w-40"}>{format(order.orderDate,'dd.MM.yyyy')}</th>
            <th className={"pl-2 w-40"}>{order.status}</th>
            <th className={"pl-2 w-40"}>{order.amount}</th>
            <th className={"pl-2 text-color-base-text"}>
                <div className={"flex flex-row justify-start space-x-1"}>
                    <SquarePen onClick={() => editDataInRow(order.id)} className={`cursor-pointer`}/>
                    <Trash2 onClick={() => handleRemoveRow(order.id)} className={`cursor-pointer`}/>
                </div>
            </th>

        </tr>
    );
};

export default RowOrdersTable;