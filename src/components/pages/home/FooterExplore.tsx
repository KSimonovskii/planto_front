import {useTranslation} from "react-i18next";

const FooterExplore = () => {
    const {t} = useTranslation();

    return (
        <div className="w-full md:w-44 inline-flex flex-col justify-start items-start gap-8">
            <div
                className="self-stretch justify-start text-white text-base font-normal font-['Rubik'] uppercase">
                {t("footer.explore")}
            </div>
            <div className="self-stretch opacity-80 flex flex-col justify-start items-start gap-2">
                <div className="w-44 justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.homePage")}
                </div>
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.aboutUs")}
                </div>
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.sucForBusiness")}
                </div>
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.sucForHome")}
                </div>
                <div className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.careInstruction")}
                </div>
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.accessibilityStatement")}
                </div>
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.websiteRules")}
                </div>
            </div>
        </div>
    )

}
export default FooterExplore;
