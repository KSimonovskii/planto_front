import SliderMainPage from "./SliderMainPage.tsx";
import {useTranslation} from "react-i18next";

const CorporateFavorites = () => {
    const {t} = useTranslation();

    return (
        <div
            className="self-stretch px-28 pt-16 pb-2 bg-white inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="w-[1220px] h-[657px] flex flex-col justify-start items-start gap-14">
                <div className="self-stretch flex flex-col justify-start items-start gap-14">
                    <div
                        className="self-stretch justify-start text-lime-800 text-6xl font-bold font-['Rubik'] leading-[56px]">
                        {t("corpFavorites")}
                    </div>
                    <SliderMainPage/>
                </div>
            </div>
        </div>
    )

}

export default CorporateFavorites;