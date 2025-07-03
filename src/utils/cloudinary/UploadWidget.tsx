

type Props = {
    onUpload: (url: string) => void;
};

const UploadWidget = ({ onUpload }: Props) => {
    const openWidget = () => {
        // @ts-ignore
        window.cloudinary.openUploadWidget(
            {
                cloudName: "di0ndwqkn",
                uploadPreset: "planto",
                sources: ["local", "url", "camera"],
                multiple: false,
                cropping: false,
                folder: "planto",
                resourceType: "image"
            },
            (error: any, result: any) => {
                if (!error && result.event === "success") {
                    console.log("Uploaded URL:", result.info.secure_url);
                    onUpload(result.info.secure_url);
                }
            }
        );
    };

    return (
        <button
            type="button"
            onClick={openWidget}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
           Upload Image
        </button>
    );
};

export default UploadWidget;
