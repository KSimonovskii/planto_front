import image0 from "../../../../assets/aboutUs/rebuilding/Rebuilding.png";
import image1 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png";
import image2 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2.jpg";
import image3 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3.jpg";
import image4 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4.jpg";
import {useEffect, useRef, useState} from "react";

export const Rebuilding = () => {

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
        <div>

            <div>
                <img src={image0}
                     alt="October 7"
                     className="w-full"/>
            </div>


            <div
                className="px-[110px] pt-[64px] pb-[40px] flex flex-col items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >

                <div className="w-[1208px] max-w-full mb-[48px] h-auto relative overflow-hidden rounded-md">
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Foto kibutz Ein HaShlosha ${i}`}
                            className={`absolute inset-0 w-full h-auto object-cover transition-opacity duration-700 ${
                                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                            style={{minHeight: "336px", display: "block"}}
                        />
                    ))}

                    <img
                        src={images[0]}
                        alt="preload"
                        className="invisible w-full h-auto"
                        aria-hidden
                    />
                </div>

                <div className="max-w-[1208px] text-lime-800 text-base font-['Rubik'] leading-relaxed">
                  <p>
                      Kibbutz Ein HaShlosha is now in a stage of rebuilding and renewal. In August 2025, our residents
                      finally returned home after a long evacuation. We warmly invite you to support our recovery, either
                      by making a direct donation or by purchasing our succulents, with part of the proceeds going
                      directly to the restoration of the kibbutz.
                  </p>
                </div>
            </div>
        </div>
    )

}