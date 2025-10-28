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
            className="relative w-full h-[500px] flex items-end justify-start overflow-hidden
                 bg-cover bg-[position:65%_center] sm:bg-center"
            style={{ backgroundImage: `url(${hero})` }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col items-start justify-end gap-3 px-6 pb-10 text-left text-white font-['Rubik'] max-w-[320px]">
                <h1 className="text-3xl font-bold leading-snug drop-shadow-md">
                    {t("hero.smallPlant")}
                </h1>

                <p className="text-base font-normal leading-relaxed drop-shadow-sm">
                    {t("hero.everySucculent")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
                    <button
                        onClick={handleClickExploreCollection}
                        className="w-full px-4 py-2 bg-lime-900 rounded-lg text-white text-sm font-medium hover:bg-lime-700 transition"
                    >
                        {t("hero.exploreCollection")}
                    </button>

                    <button
                        onClick={handleClickAboutProject}
                        className="w-full px-4 py-2 bg-white/90 rounded-lg outline outline-1 outline-lime-900 text-lime-900 text-sm font-medium hover:bg-lime-900 hover:text-white transition"
                    >
                        {t("hero.aboutProject")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroMobile;
