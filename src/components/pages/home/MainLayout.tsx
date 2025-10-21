import {Outlet} from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Footer from "./Footer";
import {useIsMobile} from "../../../features/hooks/useIsMobile.ts";
import FooterMobile from "./FooterMobile.tsx";

const MainLayout = () => {
   const isMobile = useIsMobile();

    return (
        <div className="max-w-[1440px] mx-auto flex flex-col min-h-screen font-['Rubik'] overflow-hidden">

            <div className="flex-1 sticky top-0 z-50 bg-white ">
                <div className="my-6 w-full">
                    <MegaMenu/>
                </div>
            </div>

            <main className="flex-1">
                <div className="w-full">
                    <Outlet/>
                </div>
            </main>

            <div className="top-0 z-50 w-full">
                {isMobile ? <FooterMobile/> : <Footer/>}
            </div>

        </div>
    );
};

export default MainLayout;
