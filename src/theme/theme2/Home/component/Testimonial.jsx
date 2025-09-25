"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import { getTestimonal } from "@/services/homeService";


const Testimonial = () => {
    const [data, setData] = useState([])
    const fetchdata = async () => {
        const data = await getTestimonal()
        setData(data)
    }

    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <section className="testimonial-wrapper py-8 bg-gray-50 mt-3 mb-5">
            <div className="container mx-auto px-4">
                <p className="text-[#222222] text-[18px] font-semibold text-center uppercase mb-6">
                    Testimonials
                </p>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {Array.isArray(data) && data.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-lg h-80">
                                <div className="w-24 h-28 mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src={ImageUrl(testimonial.image)}
                                        alt={testimonial.name || "Customer Testimonial"}
                                        width={96}
                                        height={96}
                                        className="object-cover mx-auto"
                                    />
                                </div>
                                <p className="text-gray-700 text-sm leading-6 mb-4 line-clamp-3">
                                    {testimonial.review}
                                </p>
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="text-amber-400"
                                            fill={i < testimonial.rating ? "#FBBF24" : "none"}
                                        />
                                    ))}
                                </div>
                                <p className="font-semibold text-gray-800">
                                    {testimonial.customer_name}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;