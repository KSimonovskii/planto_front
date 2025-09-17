import {Outlet} from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="sticky top-0 z-50 bg-white shadow-md">
                <MegaMenu/>
            </div>

            <main className="flex-1 overflow-auto">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
};

export default MainLayout;
