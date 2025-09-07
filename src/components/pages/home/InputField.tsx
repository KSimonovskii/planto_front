import SearchIcon from "./SearchIcon.tsx";
import {useTranslation} from "react-i18next";

const InputField = () => {
   const {t} = useTranslation();

    return (
        <div className="flex items-center w-[467px] sm:w-[338px] h-12 flex-shrink-0 rounded-lg bg-[#F7F7F7] px-4">
            <SearchIcon />
            <input
                type="text"
                placeholder={t("search")}
                className="flex-1 ml-2 bg-transparent border-none outline-none
                   text-[#415A2A] font-rubik text-base font-normal leading-6"
            />
        </div>
    );
};

export default InputField;
