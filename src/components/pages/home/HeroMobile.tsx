import hero from "../../../assets/hero.jpg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const HeroMobile = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickExploreCollection = () => {
        navigate("/store");
    };

    const handleClickAboutProject = () => {
        navigate("/october-7");
    };

    return (
        <section
            className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 text-center text-white font-['Rubik']">
                <h1 className="text-3xl font-bold font-['Rubik'] leading-snug drop-shadow-md">
                    {t("hero.smallPlant")}
                </h1>

                <p className="text-base font-normal font-['Rubik'] leading-relaxed drop-shadow-sm max-w-[300px]">
                    {t("hero.everySucculent")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full max-w-[300px]">
                    <button
                        onClick={handleClickExploreCollection}
                        className="w-full px-4 py-2 bg-lime-700 rounded-lg text-white text-sm font-medium font-['Rubik'] hover:bg-lime-800 transition"
                    >
                        {t("hero.exploreCollection")}
                    </button>

                    <button
                        onClick={handleClickAboutProject}
                        className="w-full px-4 py-2 bg-white/90 rounded-lg outline outline-1 outline-lime-800 text-lime-800 text-sm font-medium font-['Rubik'] hover:bg-lime-800 hover:text-white transition"
                    >
                        {t("hero.aboutProject")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroMobile;
