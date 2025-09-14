import Hero from "./Hero.tsx";
import CorporateFavorites from "./CorporateFavorites.tsx";
import WhoWeAre from "./WhoWeAre.tsx";
import OurClientsAndFrends from "./OurClientsAndFrends.tsx";
import WhatOurCustomersSay from "./WhatOurCustomersSay.tsx";

const Home2 = () => {

    return (
        <div className="w-full">
            <Hero/>
            <CorporateFavorites/>
            <WhoWeAre/>
            <OurClientsAndFrends/>
            <WhatOurCustomersSay/>
        </div>
    )

}
export default Home2;