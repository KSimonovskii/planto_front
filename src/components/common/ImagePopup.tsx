import {Dialog, DialogPanel} from "@headlessui/react";
import {X} from "lucide-react";

interface PropsImagePopup {
    name: string,
    category: string,
    url: string,
    isOpen: boolean,
    setIsOpen: (a: boolean) => void
}

const ImagePopup = ({name, url, isOpen, setIsOpen}: PropsImagePopup) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50">

            {/* Blurry backdrop overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="max-w-lg w-full space-y-4 rounded-xl bg-white p-6 shadow-2xl transform transition-all">

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <img
                        className="rounded-lg w-full h-auto object-contain"
                        src={url}
                        alt={`${name}`}
                    />
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default ImagePopup
