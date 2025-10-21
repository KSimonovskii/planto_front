import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

const WhatOurCustomersSayMobile = () => {
    const { t } = useTranslation();

    const reviews = [
        { text: t("reviews.review1"), author: t("reviews.authorReview1"), position: t("reviews.positionReview1") },
        { text: t("reviews.review2"), author: t("reviews.authorReview2"), position: t("reviews.positionReview2") },
        { text: t("reviews.review3"), author: t("reviews.authorReview3"), position: t("reviews.positionReview3") },
        { text: t("reviews.review4"), author: t("reviews.authorReview4"), position: t("reviews.positionReview4") },
        { text: t("reviews.review5"), author: t("reviews.authorReview5"), position: t("reviews.positionReview5") },
        { text: t("reviews.review6"), author: t("reviews.authorReview6"), position: t("reviews.positionReview6") },
    ];

    return (
        <div className="w-full px-4 py-6 bg-white border-t-2 border-lime-800/20 flex flex-col gap-4">

            <h2 className="text-lime-800 text-2xl sm:text-3xl font-bold font-['Rubik']">
                {t("reviews.whatSay")}
            </h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                className="w-full py-4"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center px-2">
                        <div className="w-full max-w-xs p-4 bg-zinc-100 rounded-lg flex flex-col justify-start items-start gap-4">
                            <div className="text-lime-800 text-sm sm:text-base font-normal font-['Rubik'] leading-normal">
                                {review.text}
                            </div>
                            <div className="flex flex-col justify-start items-start gap-1">
                                <div className="text-lime-800 text-sm sm:text-base font-bold font-['Rubik']">
                                    {review.author}
                                </div>
                                <div className="text-lime-800 text-sm sm:text-base font-normal font-['Rubik'] leading-normal">
                                    {review.position}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default WhatOurCustomersSayMobile;
