import IconMail from "../../icons/IconMail.tsx";
import IconLocation from "../../icons/IconLocation.tsx";
import IconPhone from "../../icons/IconPhone.tsx";
import IconLinkedIn from "../../icons/IconLinkedIn.tsx";
import IconInstagram from "../../icons/IconInstagram.tsx";
import IconFacebook from "../../icons/IconFacebook.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const FooterTalkToUs = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const goToUnderConstruction = () => {
        navigate("/under-construction");
    };

    return (
        <div className="w-full md:w-80 opacity-80 inline-flex flex-col justify-start items-start gap-10">
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik'] uppercase">
                    {t("footer.talk")}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div
                        onClick={goToUnderConstruction}
                        className="cursor-pointer inline-flex justify-start items-center gap-4">
                        <IconMail/>
                        <div
                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">planto@ein3.com
                        </div>
                    </div>
                    <div onClick={goToUnderConstruction}
                        className="cursor-pointer self-stretch inline-flex justify-start items-center gap-2.5">
                        <IconLocation/>
                        <div
                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">
                            {t("footer.address")}
                        </div>
                    </div>
                    <div
                        onClick={goToUnderConstruction}
                        className="cursor-pointer inline-flex justify-start items-center gap-2.5">
                        <IconPhone />
                        <div

                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">
                            +972-123456789
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={goToUnderConstruction}
                className="cursor-pointer w-28 inline-flex justify-start items-start gap-5">
                <IconLinkedIn/>
                <IconInstagram/>
                <IconFacebook/>
            </div>
        </div>
    )

}
export default FooterTalkToUs;
