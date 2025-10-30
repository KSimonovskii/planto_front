import hero from "../../../assets/hero.jpg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const HeroMobile = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickExploreCollection = () => navigate("/store");
    const handleClickAboutProject = () => navigate("/october-7");

    return (
        <section
            className="relative w-full h-[520px] flex items-end justify-center overflow-hidden bg-cover"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundPosition: "67%"
            }}
        >
            <div className="absolute inset-0 bg-black/30"/>

            <div className="relative z-10 flex flex-col pb-8 text-white max-w-[320px] justify-center">
                <h1 className="text-[2.5rem] font-bold text-center font-['Rubik']">
                    {t("hero.smallPlant")}
                </h1>

                <p className="text-base font-normal leading-relaxed text-center font-['Rubik']">
                    {t("hero.everySucculent")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
                    <button
                        onClick={handleClickExploreCollection}
                        className="w-full px-4 py-4 bg-lime-900 rounded-lg text-white text-sm font-medium hover:bg-lime-700 transition"
                    >
                        {t("hero.exploreCollection")}
                    </button>

                    <button
                        onClick={handleClickAboutProject}
                        className="w-full px-4 py-4 bg-white rounded-lg outline outline-1 outline-lime-900 text-lime-900 text-sm font-medium hover:bg-lime-900 hover:text-white transition"
                    >
                        {t("hero.aboutProject")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroMobile;
