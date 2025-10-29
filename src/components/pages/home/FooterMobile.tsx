import LogoWhite from "./LogoWhite.tsx";
import FooterExplore from "./FooterExplore.tsx";
import FooterTalkToUs from "./FooterTalkToUs.tsx";

const FooterMobile = () => {
    return (
        <footer className="w-full bg-lime-900 px-6 py-6 flex flex-col gap-10 text-white">

            <div className="flex justify-items-start ">
                <LogoWhite/>
            </div>


            <div className="flex flex-col items-start gap-10">
                <FooterExplore/>
                <FooterTalkToUs/>
            </div>

            <a
                href="https://www.linkedin.com/in/katyamamaev"
                target="_blank"
                rel="noopener noreferrer"
                className="border-t border-white/20 pt-4 text-center text-sm opacity-80 hover:underline"
            >
                © {new Date().getFullYear()} Planto. Design by Katya Mamaev
            </a>
        </footer>
    );
};

export default FooterMobile;
