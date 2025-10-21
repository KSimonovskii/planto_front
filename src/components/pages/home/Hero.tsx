import hero from "../../../assets/hero.jpg";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

const Hero = () => {

    const navigate = useNavigate();

    const handelClickExploreColection = () => {
        navigate("store");
    }

    const handelClickAboutProject = () => {
        navigate("/october-7");
    }

    const {t} = useTranslation();

    return (
        <section
            className="self-stretch relative overflow-hidden flex items-center"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className="absolute inline-flex flex-col justify-center items-start gap-8"/>


            <div className="relative flex flex-col justify-center items-start gap-8">
                <h1 className="text-white text-7xl font-bold font-rubik">
                    {t("hero.smallPlant")}
                </h1>

                <p className="text-white text-2xl font-bold font-inter leading-9">
                    {t("hero.everySucculent")}
                </p>

                <div className="flex gap-6">
                    <button onClick={handelClickExploreColection}
                            className="px-6 py-3 bg-lime-600 rounded-lg flex justify-center items-center gap-2 hover:bg-lime-800
                            text-white text-base font-medium font-rubik leading-normal">
                        {t("hero.exploreCollection")}
                    </button>

                    <button
                        onClick={handelClickAboutProject}
                        className="px-6 py-3 bg-white hover:bg-lime-800 rounded-lg outline outline-1 outline-lime-800 flex justify-center items-center gap-2
                        text-lime-800 hover:text-white text-base font-medium font-rubik leading-normal">
                        {t("hero.aboutProject")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
