import React, {useEffect, useRef, useState} from "react";
import image0 from "../../../../assets/aboutUs/rebuilding/Rebuilding.png";
import image1 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png";
import image2 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2.jpg";
import image3 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3.jpg";
import image4 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4.jpg";

export const Rebuilding: React.FC = () => {

    const images = [image1, image2, image3, image4];
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const intervalMs = 1200;

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
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-white">

            <div>
                <img src={image0}
                     alt="Rebuilding"
                     className="w-full"/>
            </div>

            <div
                className="px-6 sm:px-12 lg:px-28 pt-12 pb-8 flex flex-col items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >

                <div
                    className="w-full max-w-7xl mb-12 h-64 sm:h-80 md:h-96 relative overflow-hidden rounded-xl shadow-lg"
                >
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Rebuilding Kibbutz Ein HaShlosha ${i}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        />
                    ))}

                    <img
                        src={images[0]}
                        alt="preload"
                        className="invisible w-full h-full"
                        aria-hidden
                    />
                </div>

                <div className="w-full max-w-7xl text-lime-800 text-base font-['Rubik'] leading-relaxed">
                    <p>
                        <span className="font-bold">Kibbutz Ein HaShlosha</span> is now in a stage of rebuilding and renewal. In <span className="font-bold">August 2025</span>, our residents
                        finally returned home after a long evacuation. We warmly invite you to support our recovery, either
                        by making a direct donation or by purchasing our succulents, with part of the proceeds going
                        directly to the restoration of the kibbutz.
                    </p>
                </div>
            </div>
        </div>
    )

}
