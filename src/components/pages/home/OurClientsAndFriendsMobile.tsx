import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

import cf1 from "../../../assets/clientsAndFriends/Client.png";
import cf2 from "../../../assets/clientsAndFriends/Client (1).png";
import cf3 from "../../../assets/clientsAndFriends/Client (2).png";
import cf4 from "../../../assets/clientsAndFriends/Client (3).png";
import cf5 from "../../../assets/clientsAndFriends/Client (4).png";
import cf6 from "../../../assets/clientsAndFriends/Client (5).png";

const OurClientsAndFriendsMobile = () => {
    const { t } = useTranslation();

    const clients = [cf1, cf2, cf3, cf4, cf5, cf6];

    return (
        <div className="w-full bg-white py-8 border-t-2 border-lime-900/20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col gap-6">
                <h2 className="text-center text-lime-900 text-2xl sm:text-3xl font-bold font-['Rubik'] truncate">
                    {t("clientsFriends")}
                </h2>

                <Swiper
                    spaceBetween={12}
                    slidesPerView={3.3}
                    grabCursor={true}
                    className="w-full py-2"
                    breakpoints={{
                        480: { slidesPerView: 4.2, spaceBetween: 14 },
                        768: { slidesPerView: 5, spaceBetween: 18 },
                        1024: { slidesPerView: 6, spaceBetween: 20 },
                    }}
                >
                    {clients.map((client, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-center px-1">
                            <div className="w-20 sm:w-24 md:w-28 h-12 sm:h-14 md:h-16 flex justify-center items-center">
                                <img
                                    src={client}
                                    alt={`client-${index}`}
                                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition duration-300"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default OurClientsAndFriendsMobile;
