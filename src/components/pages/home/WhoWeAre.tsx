import photo from "../../../assets/photoKibbutzAfter7Oct.png";
import { useTranslation } from "react-i18next";

const WhoWeAre = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full bg-white border-t-2 border-lime-800/20 py-12 font-['Rubik']">
            <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    <div className="flex flex-col gap-6">
                        <h2 className="text-lime-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-['Rubik'] leading-tight">
                            {t("whoWe.whoWeAre")}
                        </h2>

                        <p className="text-lime-800 text-sm sm:text-base md:text-lg font-normal font-['Rubik'] leading-relaxed">
                            {t("whoWe.story")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-2">
                            <button
                                type="button"
                                className="px-5 py-2.5 bg-lime-600 hover:bg-lime-800 text-white rounded-lg text-sm sm:text-base font-medium transition"
                            >
                                {t("whoWe.donate")}
                            </button>

                            <button
                                type="button"
                                className="px-5 py-2.5 bg-white hover:bg-lime-800 rounded-lg outline outline-1 outline-lime-800 text-lime-800 hover:text-white text-sm sm:text-base font-medium transition"
                            >
                                {t("whoWe.learnMore")}
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex justify-center md:justify-end">
                        <img
                            src={photo}
                            alt={t("whoWe.whoWeAre")}
                            className="w-full md:w-[420px] lg:w-[520px] h-56 sm:h-64 md:h-[437px] object-cover rounded-lg shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
