import CartIcon from "./CartIcon.tsx";
import UserIcon from "./UserIcon.tsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useCartContext} from "../../../features/context/CartContext.tsx";
import {useTranslation} from "react-i18next";

const FrameWithCartIcon = () => {
    const { productsInCart, refreshCart } = useCartContext();
    const navigate = useNavigate();
    const {i18n} = useTranslation();


    const handleUserClickAccountDashboard = () => {
        navigate("accountDashboard")
    }
    const handleUserClickCart = () => {
        navigate("cart")
    }

    const toggleLanguage = () => {
        const newLanguage = i18n.language === "en" ? "he" : "en";
        i18n.changeLanguage(newLanguage);
    }

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    return (
        <div className="flex items-center gap-[27px] md:gap-[18px] sm:gap-[12px]">
            <button
                onClick={toggleLanguage}
                className="text-[#415A2A] font-rubik text-[16px] md:text-[14px] sm:text-[12px] uppercase
                           focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
            >
                {i18n.language === "en" ? "EN" : "HEB"}
            </button>


            <button onClick={handleUserClickCart}
                    className="focus:outline-none transition-transform duration-200 hover:scale-150 active:scale-95">
                <div
                    className="relative flex justify-center items-center w-[38px] h-[38px] sm:w-[30px] sm:h-[30px] rounded-[3px] bg-white">
                    <CartIcon className="w-[20px] h-[19px] sm:w-[16px] sm:h-[15px] text-[#415A2A]"/>
                    <div
                        className="absolute -top-1 -right-1 flex justify-center items-center px-2 py-[2px] sm:px-[4px] sm:py-0 min-w-[18px] h-[20px] sm:h-[16px] bg-[#415A2A] text-white text-[12px] sm:text-[10px] font-inter font-semibold leading-4 rounded-[12px] border border-[#415A2A]">
                        {productsInCart}
                    </div>

                </div>
            </button>

            <button onClick={handleUserClickAccountDashboard}
                    className="focus:outline-none transition-transform duration-200 hover:scale-150 active:scale-95">
                <UserIcon className="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px] text-[#415A2A]"/>
            </button>
        </div>
    )
        ;
};

export default FrameWithCartIcon;
