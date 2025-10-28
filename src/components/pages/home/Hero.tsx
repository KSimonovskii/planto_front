import hero from "../../../assets/hero.jpg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Hero = () => {
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
            className="relative w-full h-[600px] flex items-center justify-start overflow-hidden"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 flex flex-col justify-center items-start gap-6 pl-24 max-w-[600px] text-white">
                <h1 className="text-6xl font-bold font-['Rubik'] leading-tight drop-shadow-lg">
                    {t("hero.smallPlant")}
                </h1>

                <p className="text-2xl font-normal font-['Rubik'] leading-relaxed drop-shadow-md">
                    {t("hero.everySucculent")}
                </p>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleClickExploreCollection}
                        className="px-6 py-3 bg-lime-900 rounded-lg text-white text-base font-medium font-['Rubik'] hover:bg-lime-900 transition"
                    >
                        {t("hero.exploreCollection")}
                    </button>

                    <button
                        onClick={handleClickAboutProject}
                        className="px-6 py-3 bg-white/90 rounded-lg outline outline-1 outline-lime-900 text-lime-900 text-base font-medium font-['Rubik'] hover:bg-lime-900 hover:text-white transition"
                    >
                        {t("hero.aboutProject")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
