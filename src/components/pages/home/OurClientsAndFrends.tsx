import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import FramePagination from "./FramePagination"; // только стрелки

import cf1 from "../../../assets/clientsAndFriends/Client.png";
import cf2 from "../../../assets/clientsAndFriends/Client (1).png";
import cf3 from "../../../assets/clientsAndFriends/Client (2).png";
import cf4 from "../../../assets/clientsAndFriends/Client (3).png";
import cf5 from "../../../assets/clientsAndFriends/Client (4).png";
import cf6 from "../../../assets/clientsAndFriends/Client (5).png";

const OurClientsAndFriends = () => {
    const { t } = useTranslation();
    const swiperRef = useRef<any>(null);

    const clients = [cf1, cf2, cf3, cf4, cf5, cf6];

    return (
        <div className="w-full bg-white py-12 border-t-2 border-lime-800/20">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-14 flex flex-col gap-8">

                <h2 className="text-lime-800 text-4xl sm:text-5xl lg:text-6xl font-bold font-['Rubik']">
                    {t("clientsFriends")}
                </h2>

                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={24}
                        slidesPerView={"auto"}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="w-full py-6"
                    >
                        {clients.map((client, index) => (
                            <SwiperSlide
                                key={index}
                                className="!w-[120px] sm:!w-[160px] md:!w-[200px] lg:!w-[220px] xl:!w-[260px] flex justify-center items-center px-2"
                            >
                                <div className="w-full h-full flex justify-center items-center">
                                    <img
                                        src={client}
                                        alt={`client-${index}`}
                                        className="object-contain w-24 sm:w-32 md:w-40 lg:w-44 xl:w-52 opacity-80 hover:opacity-100 transition duration-300"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <FramePagination
                        onPrev={() => swiperRef.current?.slidePrev()}
                        onNext={() => swiperRef.current?.slideNext()}
                    />
                </div>
            </div>
        </div>
    );
};

export default OurClientsAndFriends;
