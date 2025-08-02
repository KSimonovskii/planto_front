import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {CheckCircle} from 'lucide-react';

interface OrderSuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderSuccessPopup = ({isOpen, onClose}: OrderSuccessPopupProps) => {


    const handleButtonClick = () => {
        onClose();
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle size={64} className="text-green-500"/>
                                </div>
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                                    Thank you!
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-lg text-gray-500">
                                        Your order has been successfully placed.
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-[#9acfaf] px-4 py-2 text-sm font-medium text-[#2a4637] hover:bg-[#7aaa8d] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleButtonClick}
                                    >
                                        Go to Homepage
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default OrderSuccessPopup;