import {useContext, useState} from "react";
import Product from "./Product.ts";
import {ProductsContext} from "../utils/Context.ts";
import {getProductsTable, addProductToTable} from "../features/api/productAction.ts";

const AddProduct = () => {

    const [nameProduct, setName] = useState("");
    const [category, setCategory] = useState("");
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const {setProducts} = useContext(ProductsContext);

    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = Math.random().toString(32).substring(2);
        const newProduct = new Product(id, nameProduct.trim(), category.trim(), qty, price);

        const res = await addProductToTable(newProduct);
        if (res){
            setName("");
            setCategory("");
            setPrice(0);
            setQty(0);
            setProducts(await getProductsTable());
        }
    }

    return (
        <form className={"text-alt-text-color"} onSubmit={addProduct}>
            <h2 className={'text-alt-text-color'}>Add new product:</h2>
            {/*TODO change to components    */}
            <label className={"text-base-text-color"}>Name:
                <input type={"text"} id={"name"} required={true} value={nameProduct} onChange={(e) => setName(e.target.value)}
                       className={"border-light-green border-2 text-base-text-color"}></input>
            </label>
            <label className={"text-base-text-color"}>Category:
                <input type={"text"} id={"category"} required={true} value={category} onChange={(e) => setCategory(e.target.value)}
                       className={"border-light-green border-2 text-base-text-color"}></input>
            </label>
            <label className={"text-base-text-color"}>Quantity:
                <input type={"number"} id={"qty"} value={qty == 0? "": qty} min={0} onChange={(e) => setQty(Number(e.target.value))}
                       className={"border-light-green border-2 text-base-text-color"}></input>
            </label>
            <label className={"text-base-text-color"}>Price:
                <input type={"number"} step={"0.01"} id={"price"} value={price == 0? "" : price} min={0} onChange={(e) => setPrice(Number(e.target.value))}
                       className={"border-light-green border-2 text-base-text-color"}></input>
            </label>
            <button type={"submit"} className={"bg-[#405443] text-[#9dbfab] w-20 border-2 hover:bg-[#57805bff]"}>Add</button>
        </form>
    )
}

export default AddProduct