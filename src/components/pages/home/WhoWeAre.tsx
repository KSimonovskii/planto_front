import photo from "../../../assets/photoKibbutzAfter7Oct.png"
import {useTranslation} from "react-i18next";

const WhoWeAre = () => {
const {t} = useTranslation();

    return (
        <div
            className="w-full px-2 pt-16 pb-10 bg-white border-t-2 border-lime-800/20 inline-flex flex-col gap-2.5 overflow-hidden">
            <div className="w-[1640px] h-[491px] relative rounded-2xl overflow-hidden">
                <div className="w-[1640px] left-0 top-0 absolute inline-flex justify-between">
                    <div className="w-full inline-flex flex-col justify-start items-start gap-14 px-4">
                        <div className="self-stretch justify-start text-lime-800 text-6xl font-bold font-['Rubik']">
                            {t("whoWe.whoWeAre")}
                        </div>
                        <div
                            className="w-full justify-start text-lime-800 text-base font-normal font-['Rubik'] leading-normal">
                            {t("whoWe.story")}
                        </div>
                        <div className="inline-flex justify-start items-start gap-5">
                            <div data-property-1="Green"
                                 className="px-6 py-3 bg-lime-600 hover:bg-lime-800 rounded-lg flex justify-center items-center gap-2 overflow-hidden
                                text-white text-base font-medium font-['Inter'] leading-normal">
                                <button>
                                    {t("whoWe.donate")}
                                </button>
                            </div>
                            <div data-property-1="White"
                                 className="px-6 py-3 bg-white hover:bg-lime-800 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 flex justify-center items-center gap-2 overflow-hidden
                                 text-lime-800 hover:text-white text-base font-medium font-['Rubik'] leading-normal
                                 ">
                                <button>
                                    {t("whoWe.learnMore")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <img className="w-[809px] h-[437px] relative rounded-lg" src={photo}/>
                </div>
            </div>
        </div>
    )

}

export default WhoWeAre;