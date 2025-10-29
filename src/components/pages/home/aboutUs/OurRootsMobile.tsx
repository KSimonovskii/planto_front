import React from "react";
import image0 from "../../../../assets/aboutUs/ourRoots/ourRootsMain.png";

import image1 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png";
import image1_1 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1_1.jpg";
import image1_2 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1_2.jpg";
import image1_3 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1_3.jpg";

import image2 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2.png";
import image2_2 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2_2.jpg";
import image2_3 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2_3.jpg";

import image3 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3.png";
import image3_1 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3_1.jpg";
import image3_3 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3_3.jpg";

import image4 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4.png";
import image4_1 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4_1.jpg";
import ImageSwitcherSection from "./ImageSwitcherSectionProps.tsx";


const OurRootsMobile: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-12 mb-10 bg-white">
            <div>
                <img src={image0} alt="Our Roots" className="w-full object-cover" />
            </div>

            <ImageSwitcherSection
                images={[image1, image1_1, image1_2, image1_3]}
                textNode={
                    <>
                        <span className="font-bold">Kibbutz Ein HaShlosha</span>
                        <span className="ml-1">, founded in </span>
                        <span className="font-bold">1950 </span>
                        <span>
              by young Zionist immigrants from South America, was named in memory of three of its founding members who fell in Israel’s War of Independence.
            </span>
                    </>
                }
            />

            <ImageSwitcherSection
                images={[image2, image1_3, image2_2, image2_3]}
                reverse
                textNode={
                    <>
                        <span>From the very beginning, life here was marked by </span>
                        <span className="font-bold">constant security challenges </span>
                        <span>— infiltrations, shelling, and even tunnels from Gaza. Despite this, families stayed and protected their community.</span>
                    </>
                }
            />

            <ImageSwitcherSection
                images={[image3, image3_1, image1_1, image3_3]}
                textNode={
                    <>
                        <span>Over the decades, the kibbutz became known for its </span>
                        <span className="font-bold">agriculture</span>
                        <span> (wheat, sunflowers, vegetables), livestock (turkeys and dairy cows), and small businesses like a </span>
                        <span className="font-bold">brewery and bakery.</span>
                    </>
                }
            />

            <ImageSwitcherSection
                images={[image4, image4_1, image1_1, image1]}
                reverse
                textNode={
                    <>
                        <span>Beyond the economy, Ein HaShlosha grew into a </span>
                        <span className="font-bold">vibrant community</span>
                        <span> with schools, sports fields, a clinic, and cultural life— a place where residents combined resilience with hope.</span>
                    </>
                }
            />
        </div>
    );
};

export default OurRootsMobile;
