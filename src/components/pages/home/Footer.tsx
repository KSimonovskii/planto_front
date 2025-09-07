import LogoWhite from "./LogoWhite.tsx";
import FooterJoinUs from "./FooterJoinUs.tsx";
import FooterExplore from "./FooterExplore.tsx";
import FooterTalkToUs from "./FooterTalkToUs.tsx";

const Footer = () => {

    return (
        <div className="w-[1440px] pl-28 pr-40 py-10 bg-lime-800 inline-flex flex-col justify-start items-start gap-10">

            <div className="w-[1215px] inline-flex justify-between items-end">
                <LogoWhite/>
            </div>

            <div className="inline-flex justify-start items-start gap-56">
                <div className="flex justify-start items-start gap-44">
                    <FooterTalkToUs/>
                    <FooterJoinUs/>
                    <FooterExplore/>
                </div>
            </div>
        </div>
    )
}

export default Footer;