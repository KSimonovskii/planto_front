import React, { useEffect, useRef, useState } from "react";
import image0 from "../../../../assets/aboutUs/october7/October7.png";
import image1 from "../../../../assets/photoKibbutzAfter7Oct.png";
import image1_1 from "../../../../assets/aboutUs/october7/ImageOctober7_1.jpg";
import image1_2 from "../../../../assets/aboutUs/october7/ImageOctober7_2.jpg";
import image1_3 from "../../../../assets/aboutUs/october7/ImageOctober7_3.jpg";

const October7: React.FC = () => {
    const images = [image1, image1_1, image1_2, image1_3];
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
                <img src={image0} alt="October 7" className="w-full" />
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
                            alt={`Foto kibutz Ein HaShlosha ${i}`}
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
                        On October 7, Hamas terrorists invaded{" "}
                        <span className="font-bold">Kibbutz Ein HaShlosha</span> as part of the
                        brutal attack on Israel. Houses were burned and looted, and{" "}
                        <span className="font-bold">four residents were murdered</span>, including
                        elderly women, parents, and community leaders.
                    </p>
                    <br />
                    <p>
                        The assault lasted <span className="font-bold">six hours</span>, with
                        families hiding in safe rooms as terrorists tried to force them out by
                        setting homes on fire. Survivors recall children lying in silence while
                        their parents fought to keep doors closed until the army arrived.
                    </p>
                    <br />
                    <p>
                        Some residents managed to escape through flames, while others faced
                        terrorists breaking into their homes, demanding weapons or money. Entire
                        families were traumatized, and the kibbutz infrastructure was left in
                        ruins.
                    </p>
                    <br />
                    <p>
                        The survivors were evacuated only on the{" "}
                        <span className="font-bold">evening of October 8</span> and remained in
                        evacuation for almost two years, until{" "}
                        <span className="font-bold">August 2025</span>. Now they have returned,
                        but the work of rebuilding the kibbutz is immense and still ongoing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default October7;
