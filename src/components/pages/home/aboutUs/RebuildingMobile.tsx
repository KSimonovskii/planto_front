import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import image0 from "../../../../assets/aboutUs/rebuilding/Rebuilding.png";
import image1 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png";
import image2 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2.jpg";
import image3 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3.jpg";
import image4 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4.jpg";

const RebuildingMobile: React.FC = () => {
    const images = [image1, image2, image3, image4];

    return (
        <div className="bg-white">
            <div>
                <img src={image0} alt="Rebuilding" className="w-full object-cover" />
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
                                        alt={`Rebuilding Kibbutz Ein HaShlosha ${i}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="w-full max-w-7xl text-lime-900 text-base font-['Rubik'] leading-relaxed">
                    <p>
                        <span className="font-bold">Kibbutz Ein HaShlosha</span> is now in a
                        stage of rebuilding and renewal. In{" "}
                        <span className="font-bold">August 2025</span>, our residents finally
                        returned home after a long evacuation. We warmly invite you to
                        support our recovery, either by making a direct donation or by
                        purchasing our succulents, with part of the proceeds going directly
                        to the restoration of the kibbutz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RebuildingMobile;
