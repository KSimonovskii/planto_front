import {useLocation, useNavigate} from "react-router";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";

interface AuthPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthPromptModal = ({isOpen, onClose}: AuthPromptModalProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateToLogin = () => {
        onClose();
        navigate("/auth/login", {state: {from: location.pathname}});
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-10">

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">

                            <Dialog.Panel
                                className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900">
                                    You need to be logged in
                                </Dialog.Title>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        To add products to your cart, please log in to your account
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end space-x-2">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}>
                                        Not now
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-[#9acfaf] px-4 py-2 text-sm font-medium text-[#2a4637] hover:bg-[#7aaa8d] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleNavigateToLogin}>
                                        Login
                                    </button>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )

}
export default AuthPromptModal;