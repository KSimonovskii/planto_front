import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const FooterExplore = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const goToUnderConstruction = () => {
        navigate("/under-construction");
    };

    const goToExplore = () => {
        navigate("/store");
    };

    const goToHomePage = () => {
        navigate("/");
    };

    const goToAboutUs = () => {
        navigate("/our-roots-mobile");
    };

    const goToForSucculentBusiness = () => {
        navigate("/store");
    };

    const goToForSucculentHome = () => {
        navigate("/store");
    };


    return (
        <div className="w-full md:w-44 inline-flex flex-col justify-start items-start gap-8">
            <div
                onClick={goToExplore}
                className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik'] uppercase">
                {t("footer.explore")}
            </div>
            <div className="self-stretch opacity-80 flex flex-col justify-start items-start gap-2">
                <div
                    onClick={goToHomePage}
                    className="cursor-pointer w-44 justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.homePage")}
                </div>
                <div
                    onClick={goToAboutUs}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.aboutUs")}
                </div>
                <div
                    onClick={goToForSucculentBusiness}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.sucForBusiness")}
                </div>
                <div
                    onClick={goToForSucculentHome}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.sucForHome")}
                </div>
                <div
                    onClick={goToUnderConstruction}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.careInstruction")}
                </div>
                <div
                    onClick={goToUnderConstruction}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.accessibilityStatement")}
                </div>
                <div
                    onClick={goToUnderConstruction}
                    className="cursor-pointer self-stretch justify-start text-white text-base font-normal font-['Rubik']">
                    {t("footer.websiteRules")}
                </div>
            </div>
        </div>
    )

}
export default FooterExplore;
