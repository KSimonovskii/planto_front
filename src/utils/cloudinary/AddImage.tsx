
import { useState } from "react";
import UploadWidget from "./UploadWidget.tsx";

const AddImage = () => {
    const [imageUrl, setImageUrl] = useState("");

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Add product</h2>

            <UploadWidget onUpload={setImageUrl} />

            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    <p className="text-sm text-gray-600 mt-2">{imageUrl}</p>
                </div>
            )}
        </div>
    );
};

export default AddImage;
