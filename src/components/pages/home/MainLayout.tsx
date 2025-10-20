import {Outlet} from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-['Rubik'] max-w-[1440px]">

            <div className="flex-1 sticky top-0 z-50 bg-white w-full">
                <div className="mx-2 my-6">
                    <MegaMenu/>
                </div>
            </div>

            <main className="flex-1">
                <div className="w-full mx-2">
                    <Outlet/>
                </div>
            </main>

            <div className="flex-1 top-0 z-50">
                <div className="w-full mx-2">
                    <Footer/>
                </div>
            </div>

        </div>
    );
};

export default MainLayout;
