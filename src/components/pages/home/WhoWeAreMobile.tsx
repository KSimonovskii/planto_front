import photo from "../../../assets/photoKibbutzAfter7Oct.png";
import {useTranslation} from "react-i18next";

const WhoWeAreMobile = () => {
    const {t} = useTranslation();

    return (
        <section
            className="relative w-full py-12 px-4 bg-white border-t-2 border-lime-800/20 overflow-hidden font-['Rubik']"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{backgroundImage: `url(${photo})`}}
            ></div>

            {/* Light overlay */}
            <div className="absolute inset-0 bg-white/60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6 text-lime-800 max-w-none">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                    {t("whoWe.whoWeAre")}
                </h2>

                <p className="text-base sm:text-lg font-normal leading-relaxed text-justify w-full sm:w-[95%] md:w-[90%] lg:w-[85%] font-['Rubik']">
                    {t("whoWe.story").replace(/<br\s*\/?>/gi, " ")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-2">
                    <button
                        type="button"
                        className="px-5 py-2.5 bg-lime-600 hover:bg-lime-800 text-white rounded-lg text-sm sm:text-base font-medium transition font-['Rubik']"
                    >
                        {t("whoWe.donate")}
                    </button>

                    <button
                        type="button"
                        className="px-5 py-2.5 bg-white hover:bg-lime-800 rounded-lg outline outline-1 outline-lime-800 text-lime-800 hover:text-white text-sm sm:text-base font-medium transition font-['Rubik']"
                    >
                        {t("whoWe.learnMore")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAreMobile;
