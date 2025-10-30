import photo from "../../../assets/photoKibbutzAfter7Oct.png";
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";

const WhoWeAreMobile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToUnderConstruction = () => {
        navigate("/under-construction");
    };

    const goToAboutUs = () => {
        navigate("/our-roots-mobile");
    };


    return (
        <section className="relative w-full py-6 px-4 bg-white border-t-2 border-lime-900/20 overflow-hidden font-['Rubik']">
            <div className="relative z-10 flex flex-col gap-6 text-lime-900 max-w-none">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                    {t("whoWe.whoWeAre")}
                </h2>

                <div className="w-full h-[22rem] sm:h-[24rem] md:h-[26rem] overflow-hidden rounded-lg">
                    <img
                        src={photo}
                        alt="Photo Kibutz after 7.10"
                        className="w-full h-full object-cover scale-100"
                    />
                </div>

                <p className="text-base sm:text-lg font-normal leading-relaxed text-justify w-full sm:w-[95%] md:w-[90%] lg:w-[85%] font-['Rubik']">
                    {t("whoWe.story").replace(/<br\s*\/?>/gi, " ")}
                </p>

                <div className="flex flex-row flex-wrap justify-between gap-3 mt-2">
                    <button
                        type="button"
                        onClick={goToUnderConstruction}
                        className="flex-1 px-5 py-2.5 bg-lime-900 hover:bg-lime-600 text-white rounded-lg text-sm sm:text-base font-medium transition font-['Rubik']"
                    >
                        {t("whoWe.donate")}
                    </button>

                    <button
                        type="button"
                        onClick={goToAboutUs}
                        className="flex-1 px-5 py-2.5 bg-white hover:bg-lime-900 rounded-lg outline outline-1 outline-lime-900 text-lime-900 hover:text-white text-sm sm:text-base font-medium transition font-['Rubik']"
                    >
                        {t("whoWe.learnMore")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAreMobile;
