import Hero from "./Hero.tsx";
import CorporateFavorites from "./CorporateFavorites.tsx";
import WhoWeAre from "./WhoWeAre.tsx";
import OurClientsAndFrends from "./OurClientsAndFrends.tsx";
import WhatOurCustomersSay from "./WhatOurCustomersSay.tsx";
import Footer from "./Footer.tsx";

const Home2 = () => {

    return (
        <div className="w-[1440px]">
            <Hero/>
            <CorporateFavorites/>
            <WhoWeAre/>
            <OurClientsAndFrends/>
            <WhatOurCustomersSay/>
            <Footer/>
        </div>
    )

}
export default Home2;