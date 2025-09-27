import {useContext, useMemo, useState} from "react";
import {getBodyForQueryGetTable} from "../../../../features/api/apiUtils.ts";
import {PageProductContext, ProductsContext} from "../../../../utils/context.ts";
import ProductsView from "./table/ProductsView.tsx";
import {useGetProductsTableRTKQuery} from "../../../../features/api/productApi.ts";
import Product from "../../../../features/classes/Product.ts";
import {dataTypes} from "../../../../utils/enums/dataTypes.ts";
import spinner from "../../../../assets/spinner2.png";
import {ModalWindowAddProduct} from "./table/ModalWindowAddProduct.tsx";
import AddProduct from "./AddProduct.tsx";

const ProductsManager2 = () => {
    const {pageNumber, sort, filters} = useContext(PageProductContext);
    const [open, setOpen] = useState(false);

    const {
        data = {products: [], pages: 0},
        isLoading,
        isError,
        error
    } = useGetProductsTableRTKQuery(
        getBodyForQueryGetTable(dataTypes.products, pageNumber, sort, filters)
    );

    const products = useMemo(
        () =>
            data.products.map(
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
            ),
        [data.products]
    );

    if (isLoading)
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        );

    if (isError) {
        let errorMsg = "";
        if ("status" in error) {
            errorMsg = `Error: ${error.status} - ${error.data}`;
        } else {
            errorMsg = "Unknown error";
        }
        return <h2>{errorMsg}</h2>;
    }

    return (
        <div className="col-span-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">

                    <button
                        onClick={() => setOpen(true)}
                        className="px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-800 text-white text-base font-medium transition-colors"
                    >
                        Add New Product
                    </button>
                </div>

                <ProductsContext.Provider
                    value={{
                        table: products,
                        pages: data.pages,
                        setTableData: () => {
                        }
                    }}
                >
                    <ProductsView/>
                </ProductsContext.Provider>
            </div>

            <ModalWindowAddProduct isOpen={open} onClose={() => setOpen(false)}>
                <AddProduct/>
            </ModalWindowAddProduct>
        </div>
    );
};

export default ProductsManager2;