import {useContext, useState} from "react";
import Product from "../features/classes/Product.ts";
import {PageContext, ProductsContext} from "../utils/context.ts";
import {getProductsTable, addProductToTable} from "../features/api/productAction.ts";
import {EMPTY_PHOTO} from "../utils/constants.ts"
import CategoryBox from "./products/CategoryBox.tsx";

const AddProduct = () => {

    const EMPTY_FILE = new File([], "", {type: "image/jpg"});

    //TODO custom hook
    const [nameProduct, setName] = useState("");
    const [category, setCategory] = useState("");
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [imageFile, setImage] = useState(EMPTY_FILE);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const {setProductsData: setProductsData} = useContext(ProductsContext);
    const {pageNumber, sort, filters} = useContext(PageContext);

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
            setProductsData(await getProductsTable(pageNumber, sort, filters));
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
        <form onSubmit={addProduct}>
            <h1 className={'text-base-form'}>Add new product:</h1>
            {/*TODO change to components    */}
            <div className={"flex flex-row justify-between align-top w-170"}>
                <div className={"flex flex-col place-items-stretch w-2/3"}>
                    <label className={"label flex"}>Name:
                        <input type={"text"} id={"name"} required={true} value={nameProduct}
                               onChange={(e) => setName(e.target.value)}
                               className={"inputField ml-8 mt-1 w-full"}/>
                    </label>
                    <CategoryBox category={category} setCategory={setCategory} twClass={"inputField"}/>
                    <label className={"label flex"}>Quantity:
                        <input type={"number"} id={"qty"} value={qty == 0 ? "" : qty} min={0}
                               onChange={(e) => setQty(Number(e.target.value))}
                               className={"inputField ml-3 w-full"}/>
                    </label>
                    <label className={"label flex"}>Price:
                        <input type={"number"} step={"0.01"} id={"price"} value={price == 0 ? "" : price} min={0}
                               onChange={(e) => setPrice(Number(e.target.value))}
                               className={"inputField ml-9.5 w-full"}/>
                    </label>
                    <label className={"block text-base-form"}>Description:</label>
                    <textarea rows={5} cols={40} id={"description"} value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className={"inputField"}/>
                </div>
                <div>
                    <div className={"flex flex-col justify-start"}>
                        <img src={imageUrl ? imageUrl : EMPTY_PHOTO} alt={"Picture"}
                             className={"mt-1 w-50 h-50 border-base-form border-1"}/>
                        <label
                            className={"flex button items-center justify-center w-50 h-10"}>Download image
                            <input type={"file"} id={"image"} accept={"image/*"}
                                   onChange={(e) => handleSelectFile(e)}
                                   className={"hidden w-50 h-5"}/>
                        </label>
                    </div>
                    <button type={"submit"} className={"button w-50 h-10 mt-5"}>
                        Add product
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct