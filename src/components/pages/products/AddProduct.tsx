import {useContext, useState} from "react";
import Product from "./Product.ts";
import {ProductsContext} from "../../../utils/Context.ts";
import {getProductsTable, addProductToTable} from "../../../features/api/productAction.ts";

const AddProduct = () => {

    const EMPTY_FILE = new File([], "", {type: "image/jpg"});

    const [nameProduct, setName] = useState("");
    const [category, setCategory] = useState("");
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [imageFile, setImage] = useState(EMPTY_FILE);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const {setProducts} = useContext(ProductsContext);

    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = Math.random().toString(32).substring(2);
        const newProduct = new Product(id, nameProduct.trim(), category.trim(), qty, price, "", description);

        const res = await addProductToTable(newProduct, imageFile);
        if (res){
            setName("");
            setCategory("");
            setPrice(0);
            setQty(0);
            setImage(EMPTY_FILE);
            setImageUrl("");
            setDescription("");
            setProducts(await getProductsTable());
        }
    }

    if (imageFile.size != 0) {
        const fr = new FileReader();
        fr.readAsDataURL(imageFile);
        fr.onloadend = () => {
            if (fr.result != null){
                setImageUrl(fr.result as string);
            }
        }
    }

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target.files
            || event.target.files.length == 0) {
            return;
        }
        setImage(event.target.files[0]);
    }

    return (
        <form className={"text-base-form"} onSubmit={addProduct}>
            <h2 className={'text-base-form'}>Add new product:</h2>
            {/*TODO change to components    */}
            <div className={"flex flex-row justify-between align-top w-130"}>
                <div className={"flex flex-col place-items-stretch"}>
                    <label className={"text-base-text"}>Name:
                        <input type={"text"} id={"name"} required={true} value={nameProduct}
                               onChange={(e) => setName(e.target.value)}
                               className={"ml-8 mt-1 w-2/3 border-base-form border-2 text-base-text focus:border-alt-text"}></input>
                    </label>
                    <label className={"text-base-form"}>Category:
                        <input type={"text"} id={"category"} required={true} value={category}
                               onChange={(e) => setCategory(e.target.value)}
                               className={"ml-2.5 w-2/3 border-base-form border-2 text-base-text focus:border-alt-text"}></input>
                    </label>
                    <label className={"text-base-form"}>Quantity:
                        <input type={"number"} id={"qty"} value={qty == 0 ? "" : qty} min={0}
                               onChange={(e) => setQty(Number(e.target.value))}
                               className={"ml-3 w-2/3 border-base-form border-2 text-base-text focus:border-alt-text"}></input>
                    </label>
                    <label className={"text-base-text-color"}>Price:
                        <input type={"number"} step={"0.01"} id={"price"} value={price == 0 ? "" : price} min={0}
                               onChange={(e) => setPrice(Number(e.target.value))}
                               className={"ml-9.5 w-2/3 border-base-form border-2 text-base-text-color focus:border-alt-text"}></input>
                    </label>
                    <label className={"block text-base-text-color"}>Description:</label>
                    <textarea rows={5} cols={40} id={"description"} value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className={"w-9/10 border-base-form border-2 text-base-text-color focus:border-alt-text"}/>
                </div>
                <div className={"flex flex-col"}>
                    <div>
                        <img src={imageUrl ? imageUrl : "src/assets/empty-foto.jpg"} alt={"Picture"}
                             className={"mt-1 w-50 h-50 border-base-form border-1"}/>
                        <label
                            className={"inline-block bg-base-form text-light-green hover:bg-[#57805bff] text-center w-50 h-10 leading-10"}>Download
                            image
                            <input type={"file"} id={"image"}
                                   onChange={(e) => handleSelectFile(e)}
                                   className={"invisible"}></input>
                        </label>
                    </div>
                    <button type={"submit"}
                            className={"bg-base-form text-light-green w-20 border-2 hover:bg-[#57805bff] w-50 h-8"}>Add product
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct