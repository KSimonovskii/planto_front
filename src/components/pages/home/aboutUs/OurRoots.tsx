import React, {useEffect, useRef, useState} from "react";
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

type ImageSwitcherSectionProps = {
    images: string[];
    textNode: React.ReactNode;
    reverse?: boolean;
    intervalMs?: number;
    className?: string;
};

const ImageSwitcherSection: React.FC<ImageSwitcherSectionProps> = ({
images,
textNode,
reverse = false,
intervalMs = 1200,
className = "",
}) => {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (images.length <= 1) return;
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        intervalRef.current = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, intervalMs);
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        // setIndex(0);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`flex items-center w-full h-80 overflow-hidden ${reverse ? "flex-row-reverse" : ""} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* text */}
            <div className="w-1/2 h-full flex items-center px-6">
                <div className="text-lime-800 text-base font-['Rubik'] leading-relaxed">
                    {textNode}
                </div>
            </div>

            <div className="w-1/2 h-full relative flex justify-center items-center">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`slide-${i}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
              ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        style={{willChange: "opacity"}}
                    />
                ))}
            </div>
        </div>
    );
};

const OurRoots: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-12 mb-10">

            <div>
                <img src={image0} alt="Our Roots" className="w-full object-cover"/>
            </div>

{/*1*/}
            <ImageSwitcherSection
                images={[image1, image1_1, image1_2, image1_3]}
                intervalMs={1200}
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

{/*2*/}
            <ImageSwitcherSection
                images={[image2, image1_3, image2_2, image2_3]}
                reverse
                intervalMs={1200}
                textNode={
                    <>
                        <span>From the very beginning, life here was marked by </span>
                        <span className="font-bold">constant security challenges </span>
                        <span>— infiltrations, shelling, and even tunnels from Gaza. Despite this, families stayed and protected their community.</span>
                    </>
                }
            />

{/*3*/}
            <ImageSwitcherSection
                images={[image3, image3_1, image1_1, image3_3]}
                intervalMs={1200}
                textNode={
                    <>
                        <span>Over the decades, the kibbutz became known for its </span>
                        <span className="font-bold">agriculture</span>
                        <span> (wheat, sunflowers, vegetables), livestock (turkeys and dairy cows), and small businesses like a </span>
                        <span className="font-bold">brewery and bakery.</span>
                    </>
                }
            />

{/*4*/}
            <ImageSwitcherSection
                images={[image4, image4_1, image1_1, image1]}
                reverse
                intervalMs={1200}
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

export default OurRoots;
