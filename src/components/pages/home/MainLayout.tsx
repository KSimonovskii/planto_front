import {Outlet} from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-['Rubik']">

            <div className="sticky top-0 z-50 bg-white w-full">
                <div className="max-w-[1640px] mx-auto my-6">
                    <MegaMenu/>
                </div>
            </div>

            <main className="flex-1">
                <div className="max-w-[1640px] mx-auto">
                    <Outlet/>
                </div>
            </main>

            <div className="top-0 z-50">
                <div className="max-w-[1640px] mx-auto">
                    <Footer/>
                </div>
            </div>

        </div>
    );
};

export default MainLayout;
