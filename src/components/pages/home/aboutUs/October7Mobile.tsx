import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import image0 from "../../../../assets/aboutUs/october7/October7.png";
import image1 from "../../../../assets/photoKibbutzAfter7Oct.png";
import image1_1 from "../../../../assets/aboutUs/october7/ImageOctober7_1.jpg";
import image1_2 from "../../../../assets/aboutUs/october7/ImageOctober7_2.jpg";
import image1_3 from "../../../../assets/aboutUs/october7/ImageOctober7_3.jpg";

const October7: React.FC = () => {
    const images = [image1, image1_1, image1_2, image1_3];

    return (
        <div className="bg-white">
            <div>
                <img src={image0} alt="October 7" className="w-full object-cover" />
            </div>

            <div className="px-6 sm:px-12 lg:px-28 pt-12 pb-8 flex flex-col items-center">
                <div className="w-full max-w-7xl mb-12 h-64 sm:h-80 md:h-96 relative">
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={"auto"}
                        centeredSlides={false}
                        loop={true}
                        grabCursor={true}
                        className="w-full h-full"
                    >
                        {images.map((src, i) => (
                            <SwiperSlide
                                key={i}
                                className="!w-[85%] md:!w-[70%] flex justify-center"
                            >
                                <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={src}
                                        alt={`Kibbutz Ein HaShlosha ${i}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="w-full max-w-7xl text-lime-900 text-base font-['Rubik'] leading-relaxed">
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
