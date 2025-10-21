import FooterJoinUsNewLetterForm from "./FooterJoinUsNewLetterForm.tsx";
import {useTranslation} from "react-i18next";

const FooterJoinUs = () => {
    const {t} = useTranslation();
    return (
        <div className="w-full md:w-72 inline-flex flex-col justify-start items-start gap-6 font-['Rubik']">
            <div className="self-stretch h-44 flex flex-col justify-between items-start font-['Rubik']">
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik'] uppercase">
                    {t("footer.join")}
                </div>
                <FooterJoinUsNewLetterForm/>
            </div>
        </div>

    )
}

export default FooterJoinUs;
