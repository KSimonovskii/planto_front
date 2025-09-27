import {EMPTY_PHOTO} from "../../../../utils/constants.ts"
import {useInputProduct} from "./hooks/useInputProduct.tsx"

const AddProduct = () => {

    const {productData,
        handleInputProductData,
        handleSelectFile,
        handleAddProduct} = useInputProduct(null);

    const {name, qty, price, description, imageUrl} = productData;

    const handleChangeDataProduct = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        handleInputProductData(e.target.id, e.target.value);
    }

    return (
        <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Add new product</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                <div className="flex flex-col gap-4">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Name:</span>
                        <input
                            type="text"
                            id="name"
                            required={true}
                            value={name}
                            onChange={handleChangeDataProduct}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50"
                        />
                    </label>


                    <label className="block">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <input
                            type="number"
                            id="qty"
                            value={qty === 0 ? "" : qty}
                            min={0}
                            onChange={handleChangeDataProduct}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700 font-medium">Price:</span>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            value={price === 0 ? "" : price}
                            min={0}
                            onChange={handleChangeDataProduct}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700 font-medium">Description:</span>
                        <textarea
                            rows={5}
                            id="description"
                            value={description}
                            onChange={handleChangeDataProduct}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>

                <div className="flex flex-col items-center justify-start md:mt-10">
                    <img
                        src={imageUrl ? imageUrl : EMPTY_PHOTO}
                        alt={"Product preview"}
                        className="w-full max-w-xs h-auto object-cover rounded-md border border-gray-300 mb-4"
                    />

                    <label className="w-full">
                        <div className="px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white rounded-md text-center cursor-pointer transition-colors">
                            Download image
                        </div>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleSelectFile}
                            className="hidden"
                        />
                    </label>

                    <button
                        type="submit"
                        className="mt-6 w-full px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white font-medium rounded-md transition-colors"
                    >
                        Add product
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddProduct;