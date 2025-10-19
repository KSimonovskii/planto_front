import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import FramePagination from "../home/FramePagination.tsx";
import Star from "./Star.tsx";


type Review = {
    id: number;
    name: string;
    role?: string;
    stars: number;
    text: string;
    date: string;
};

const reviews: Review[] = [
    {
        id: 1,
        name: "Sharon L.",
        role: "HR Manager, Google Israel",
        stars: 4.25,
        text: "We were looking for something thoughtful for our team — and Planto delivered beyond expectations. Every succulent came with a story, and knowing that our gesture supported the rebuilding of a kibbutz made it truly meaningful.",
        date: "August 16, 2025",
    },
    {
        id: 2,
        name: "Liat S.",
        stars: 5,
        text: "Such a charming little cactus! It really does look like a fairytale castle. Arrived in perfect condition and brightens up my desk.",
        date: "August 16, 2025",
    },
    {
        id: 3,
        name: "Daniel K.",
        stars: 4.25,
        text: "Low maintenance and so cute! I’ve already bought two — one for home, one for the office. Love the meaning behind it too.",
        date: "August 16, 2025",
    },
    {
        id: 4,
        name: "Maya R.",
        stars: 4.25,
        text: "Gave it as a gift and they LOVED it. Beautiful shape, well packaged, and it supports an amazing cause.",
        date: "August 16, 2025",
    },
    {
        id: 5,
        name: "Ilana G.",
        stars: 4.25,
        text: "Adorable and unique — adds character to any space. Plus, it’s super easy to care for!",
        date: "August 16, 2025",
    },
    {
        id: 6,
        name: "Leya Z.",
        stars: 4.25,
        text: "Looks like a tiny castle! A lovely gift with meaning — beautiful and symbolic.",
        date: "August 16, 2025",
    },
];

const CustomerReviews: React.FC = () => {
    const swiperRef = useRef<any>(null);

    const renderStars = (stars: number) => {
        const fullStars = Math.floor(stars);
        const halfStar = stars % 1 >= 0.25 && stars % 1 < 0.75;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1">
                {Array(fullStars)
                    .fill(0)
                    .map((_, i) => (
                        <Star key={`full-${i}`} type="full" className="w-4 h-4"/>
                    ))}
                {halfStar && <Star type="half" className="w-4 h-4"/>}
                {Array(emptyStars)
                    .fill(0)
                    .map((_, i) => (
                        <Star key={`empty-${i}`} type="empty" className="w-4 h-4"/>
                    ))}
            </div>
        );
    };

    return (
        <div className="w-full bg-white flex flex-col gap-6">
            <div className="text-lime-800 text-4xl font-bold mb-4">What Our Customers Say</div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={"auto"}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="w-full"
            >
                {reviews.map((review) => (
                    <SwiperSlide
                        key={review.id}
                        className="!w-96 px-2 inline-flex justify-start items-center"
                    >
                        <div className="flex flex-col bg-zinc-100 rounded-xl p-6 flex-1 gap-4">
                            {renderStars(review.stars)}
                            <div>
                                <div className="text-lime-800 font-bold">{review.name}</div>
                                {review.role && (
                                    <div className="text-lime-800/60 text-sm">{review.role}</div>
                                )}
                            </div>
                            <p className="text-lime-800 text-base">{review.text}</p>
                            <div className="text-lime-800/60 text-xs mt-2">{review.date}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <FramePagination
                onPrev={() => swiperRef.current?.slidePrev()}
                onNext={() => swiperRef.current?.slideNext()}
            />
        </div>
    );
};

export default CustomerReviews;
