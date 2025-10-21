import Hero from "./Hero.tsx";
import CorporateFavorites from "./CorporateFavorites.tsx";
import WhoWeAre from "./WhoWeAre.tsx";
import OurClientsAndFrends from "./OurClientsAndFrends.tsx";
import WhatOurCustomersSay from "./WhatOurCustomersSay.tsx";
import {useIsMobile} from "../../../features/hooks/useIsMobile.ts";
import HeroMobile from "./HeroMobile.tsx";
import CorporateFavoritesMobile from "./CorporateFavoritesMobile.tsx";
import WhoWeAreMobile from "./WhoWeAreMobile.tsx";
import OurClientsAndFriendsMobile from "./OurClientsAndFriendsMobile.tsx";
import WhatOurCustomersSayMobile from "./WhatOurCustomersSayMobile.tsx";

const Home2 = () => {

    const isMobile = useIsMobile(768);

    return !isMobile ? (
            <div className="flex flex-col w-full font-['Rubik']">
                <Hero/>
                <CorporateFavorites/>
                <WhoWeAre/>
                <OurClientsAndFrends/>
                <WhatOurCustomersSay/>
            </div>)
        :
        (<div className="flex flex-col w-full font-['Rubik']">
                <HeroMobile/>
                <CorporateFavoritesMobile/>
                <WhoWeAreMobile/>
                <OurClientsAndFriendsMobile/>
                <WhatOurCustomersSayMobile/>

            </div>
        )

}
export default Home2;