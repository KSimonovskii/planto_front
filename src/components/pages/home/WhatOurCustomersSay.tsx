import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {useRef} from "react";
import "swiper/css";
import "swiper/css/navigation";
import {useTranslation} from "react-i18next";
import FramePagination from "./FramePagination.tsx";

const WhatOurCustomersSay = () => {
    const swiperRef = useRef<any>(null);
    const { t } = useTranslation();

    const reviews = [
        {
            text: t("reviews.review1"),
            author: t("reviews.authorReview1"),
            position: t("reviews.positionReview1"),
        },
        {
            text: t("reviews.review2"),
            author: t("reviews.authorReview2"),
            position: t("reviews.positionReview2"),
        },
        {
            text: t("reviews.review3"),
            author: t("reviews.authorReview3"),
            position: t("reviews.positionReview3"),
        },
        {
            text: t("reviews.review4"),
            author: t("reviews.authorReview4"),
            position: t("reviews.positionReview4"),
        },
        {
            text: t("reviews.review5"),
            author: t("reviews.authorReview5"),
            position: t("reviews.positionReview5"),
        },
        {
            text: t("reviews.review6"),
            author: t("reviews.authorReview6"),
            position: t("reviews.positionReview6"),
        },
    ];

    return (
        <div className="w-full px-10 py-4 bg-white border-t-2 border-lime-800/20 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="w-full flex flex-col justify-start items-start gap-6 mb-8">
                <div className="self-stretch justify-start text-lime-800 text-6xl font-bold font-['Rubik'] px-4">
                    {t("reviews.whatSay")}
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="w-full"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide
                            key={index}
                            className="!w-96 h-60 px-2 inline-flex justify-start items-center font-['Rubik']"
                        >
                            <div className="w-96 h-70 p-6 bg-zinc-100 rounded-lg inline-flex flex-col justify-start items-start gap-6 font-['Rubik']">
                                <div className="self-stretch text-lime-800 text-base font-normal font-['Rubik'] leading-normal">
                                    {review.text}
                                </div>
                                <div className="w-64 flex flex-col justify-start items-start gap-[5px] font-['Rubik']">
                                    <div className="self-stretch text-lime-800 text-base font-bold font-['Rubik']">
                                        {review.author}
                                    </div>
                                    <div className="self-stretch text-lime-800 text-base font-normal font-['Rubik'] leading-normal">
                                        {review.position}
                                    </div>
                                </div>
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
    );
};

export default WhatOurCustomersSay;
