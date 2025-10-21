import LogoWhite from "./LogoWhite.tsx";
import FooterJoinUs from "./FooterJoinUs.tsx";
import FooterExplore from "./FooterExplore.tsx";
import FooterTalkToUs from "./FooterTalkToUs.tsx";

const Footer = () => {
    return (
        <footer className="w-full bg-lime-800 px-6 md:px-10 lg:px-20 py-4 flex flex-col gap-10 text-white">

            <div className="flex justify-between md:justify-start font-['Rubik']">
                <LogoWhite/>
            </div>


            <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 lg:gap-30 font-['Rubik']">
                <FooterTalkToUs/>
                <FooterJoinUs/>
                <FooterExplore/>
            </div>

            <div className="border-t border-white/20 pt-4 text-center text-sm opacity-80 font-['Rubik']">
                © {new Date().getFullYear()} Planto. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
