import {useTranslation} from "react-i18next";
import SliderMainPageMobile from "./SliderMainPageMobile.tsx";
import {useNavigate} from "react-router-dom";

const CorporateFavoritesMobile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate("/store");
    };

    return (
        <div className="w-full py-6 bg-white">
            <div className="px-6 sm:px-8 lg:px-16 py-6">
                <div
                    className="text-lime-800 text-4xl sm:text-5xl md:text-6xl font-bold font-['Rubik'] py-4 border-t-2 border-lime-800/20 text-center"
                >
                    {t("corpFavorites")}
                </div>

                <SliderMainPageMobile/>

                <div className="flex justify-center mt-6 px-4">
                    <button
                        onClick={handleViewAll}
                        className="w-full max-w-xs py-3 px-6 text-lg font-medium text-white bg-lime-800 rounded-lg hover:bg-lime-700 transition duration-300 shadow-md transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                        {t("viewAll")}
                    </button>
                </div>
            </div>
        </div>
    )

}

export default CorporateFavoritesMobile;
