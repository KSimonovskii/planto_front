// import {useContext, useMemo} from "react";
// import {getBodyForQueryGetTable} from "../../../../features/api/apiUtils.ts";
// import {PageProductContext, ProductsContext} from "../../../../utils/context.ts";
// import AddProduct from "./AddProduct.tsx";
// import ProductsView from "./table/ProductsView.tsx";
// import {useGetProductsTableRTKQuery} from "../../../../features/api/productApi.ts";
// import Product from "../../../../features/classes/Product.ts";
// import {dataTypes} from "../../../../utils/enums/dataTypes.ts";
// import spinner from "../../../../assets/spinner2.png";
//
// const ProductsManager = () => {
//
//     //TODO clear copypaste with SliderMainPage
//     const {pageNumber, sort, filters} = useContext(PageProductContext);
//
//     const {
//         data = {products: [], pages: 0},
//         isLoading,
//         isError,
//         error
//     } = useGetProductsTableRTKQuery(getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters));
//
//     const products = useMemo(() => {
//             return data.products.map((p: Product) => new Product(p.id, p.name, p.category, p.quantity, p.price, p.imageUrl, p.description));
//         },
//         [data.products]
//     )
//
//     if (isLoading) return (<div className="flex justify-center items-center w-full h-64">
//         <img src={spinner} alt="loading..." className="spinner-icon"/>
//     </div>)
//     if (isError) {
//         let errorMsg = "";
//         if ('status' in error) {
//             errorMsg = `Error: ${error.status} - ${error.data}`;
//         } else {
//             errorMsg = "Unknown error";
//         }
//         return <h2>{errorMsg}</h2>
//     }
//
//     return (
//         <div className={"col-span-6"}>
//             <ProductsContext.Provider value={{
//                 table: products,
//                 pages: data.pages,
//                 setTableData: () => {
//                 },
//             }}>
//                 <AddProduct/>
//                 <ProductsView/>
//             </ProductsContext.Provider>
//         </div>
//
//     )
// }
//
// export default ProductsManager