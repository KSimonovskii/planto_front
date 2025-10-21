import IconMail from "../../icons/IconMail.tsx";
import IconLocation from "../../icons/IconLocation.tsx";
import IconPhone from "../../icons/IconPhone.tsx";
import IconLinkedIn from "../../icons/IconLinkedIn.tsx";
import IconInstagram from "../../icons/IconInstagram.tsx";
import IconFacebook from "../../icons/IconFacebook.tsx";
import {useTranslation} from "react-i18next";

const FooterTalkToUs = () => {
    const {t} = useTranslation();

    return (
        <div className="w-full md:w-80 opacity-80 inline-flex flex-col justify-start items-start gap-20">
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div
                    className="self-stretch justify-start text-white text-base font-normal font-['Rubik'] uppercase">
                    {t("footer.talk")}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="inline-flex justify-start items-center gap-4">
                        <IconMail/>
                        <div
                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">planto@ein3.com
                        </div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                        <IconLocation/>
                        <div
                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">
                            {t("footer.address")}
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-2.5">
                        <IconPhone/>
                        <div
                            className="justify-start text-white text-base font-normal font-['Rubik'] leading-normal">
                            +972-123456789
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-28 inline-flex justify-start items-start gap-5">
                <IconLinkedIn/>
                <IconInstagram/>
                <IconFacebook/>
            </div>
        </div>
    )

}
export default FooterTalkToUs;
