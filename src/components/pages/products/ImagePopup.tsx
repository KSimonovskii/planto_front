import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";

interface PropsProduct {
    name: string,
    category: string,
    url: string,
    isOpen: boolean,
    setIsOpen: (a: boolean) => void
}

const ImagePopup = ({name, category, url, isOpen, setIsOpen}: PropsProduct) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className={"relative z-50"}>
            <div className={"fixed w-screen inset-0 flex items-center justify-center p-4"}>
                <DialogPanel className={"max-w-lg space-y-2 border-3 rounded-xl border-light-green bg-base-form p-3"}>
                    <DialogTitle
                        className={"bg-base-form text-light-green text-xl font-bold rounded-tl-lg rounded-tr-lg flex justify-between"}>
                        {/*<section className={"text-center"}>*/}
                        {/*    {name} {category}*/}
                        {/*</section>*/}
                        {/*<button*/}
                        {/*    className={"button h-7 w-5 text-light-green border-0 cursor-pointer"}*/}
                        {/*    onClick={() => setIsOpen(false)}>X*/}
                        {/*</button>*/}
                    </DialogTitle>
                    <img className={"rounded-lg"}
                         src={url}
                         alt={`${name} ${category}`}/>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default ImagePopup