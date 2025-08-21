import {EMPTY_PHOTO} from "../utils/constants.ts"
import CategoryBox from "./products/CategoryBox.tsx";
import {useInputProduct} from "./products/hooks/useInputProduct.tsx"

const AddProduct = () => {

    const {productData,
        handleInputProductData,
        handleInputCategory,
        handleSelectFile,
        handleAddProduct} = useInputProduct(null);

    const {name, category, qty, price, description, imageUrl} = productData;

    const handleChangeDataProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputProductData(e.target.id, e.target.value);
    }

    return (
        <form onSubmit={handleAddProduct}>
            <h1 className={'text-base-form'}>Add new product:</h1>
            {/*TODO change to components    */}
            <div className={"flex flex-row justify-between align-top w-170"}>
                <div className={"flex flex-col place-items-stretch w-2/3"}>
                    <label className={"label flex"}>Name:
                        <input type={"text"} id={"name"} required={true} value={name}
                               onChange={handleChangeDataProduct}
                               className={"inputField ml-8 mt-1 w-full"}/>
                    </label>
                    <CategoryBox category={category} setCategory={handleInputCategory} twClass={"inputField"}/>
                    <label className={"label flex"}>Quantity:
                        <input type={"number"} id={"qty"} value={qty == 0 ? "" : qty} min={0}
                               onChange={handleChangeDataProduct}
                               className={"inputField ml-3 w-full"}/>
                    </label>
                    <label className={"label flex"}>Price:
                        <input type={"number"} step={"0.01"} id={"price"} value={price == 0 ? "" : price} min={0}
                               onChange={handleChangeDataProduct}
                               className={"inputField ml-9.5 w-full"}/>
                    </label>
                    <label className={"block text-base-form overscroll-y-auto"}>Description:</label>
                    <textarea rows={5} cols={40} id={"description"} value={description}
                              onChange={handleChangeDataProduct}
                              className={"inputField"}/>
                </div>
                <div>
                    <div className={"flex flex-col justify-start"}>
                        <img src={imageUrl ? imageUrl : EMPTY_PHOTO} alt={"Picture"}
                             className={"mt-1 w-50 h-50 border-base-form border-1"}/>
                        <label
                            className={"flex button items-center justify-center w-50 h-10"}>Download image
                            <input type={"file"} id={"image"} accept={"image/*"}
                                   onChange={handleSelectFile}
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