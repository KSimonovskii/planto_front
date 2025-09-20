// import {OrdersContext} from "../../../../../utils/context.ts";
// import {useContext} from "react";
// import EmptyRowTable from "../../../../common/table/EmptyRowTable.tsx";
// import RowOrdersTable from "./RowOrdersTable.tsx";
//
// const TABLE_HEAD = [
//     "Number",
//     "Date",
//     "Status",
//     "Amount",
//     "Action"
// ]
//
// const OrdersTable = () => {
//     const {table} = useContext(OrdersContext);
//
//     return (
//         <table className={"text-base-form gap-4"}>
//             <thead className={"border-y-2 border-base-text"}>
//             <tr>
//                 {TABLE_HEAD.map((head) => (
//                     <th key={head} className={"pl-2"}>
//                         {head}
//                     </th>
//                 ))}
//             </tr>
//             </thead>
//             <tbody>
//             {table.length == 0 ?
//                 <EmptyRowTable msg={"Can't receive data from database"}/> :
//                 table.map(order => <RowOrdersTable key={order.id} order={order}/>)}
//             </tbody>
//         </table>
//     )
//
// };
//
// export default OrdersTable;