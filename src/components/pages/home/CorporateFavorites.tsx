import SliderMainPage from "./SliderMainPage.tsx";
import {useTranslation} from "react-i18next";

const CorporateFavorites = () => {
    const {t} = useTranslation();

    return (
        <div
            className="w-full py-6">
                    <div
                        className="text-lime-800 text-6xl font-bold font-['Rubik'] py-4 border-t-2 border-lime-800/20">
                        {t("corpFavorites")}
                    </div>
                    <SliderMainPage/>
        </div>
    )

}

export default CorporateFavorites;