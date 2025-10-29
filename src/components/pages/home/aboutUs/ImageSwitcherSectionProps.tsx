import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

type ImageSwitcherSectionProps = {
    images: string[];
    textNode: React.ReactNode;
    reverse?: boolean;
    className?: string;
};

const ImageSwitcherSection: React.FC<ImageSwitcherSectionProps> = ({
                                                                       images,
                                                                       textNode,
                                                                       reverse = false,
                                                                       className = "",
                                                                   }) => {
    return (
        <div
            className={`bg-white flex flex-col md:flex-row items-center w-full h-auto md:h-80 overflow-hidden ${reverse ? "md:flex-row-reverse" : ""
            } ${className}`}
        >
            <div className="w-full md:w-1/2 h-auto md:h-full flex items-center p-6">
                <div className="text-lime-900 text-base font-['Rubik'] leading-relaxed">
                    {textNode}
                </div>
            </div>

            <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={"auto"}
                    centeredSlides={false}
                    loop={true}
                    grabCursor={true}
                    className="w-full py-6"
                >
                    {images.map((src, i) => (
                        <SwiperSlide
                            key={i}
                            className="!w-[85%] md:!w-[60%] flex justify-center"
                        >
                            <div className="w-full h-64 md:h-full rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={src}
                                    alt={`slide-${i}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ImageSwitcherSection;
