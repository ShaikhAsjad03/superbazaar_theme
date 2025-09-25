"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ImageUrl } from "@/helper/imageUrl";

const Hero = ({ banners }) => {
    return (
        <section className="slideshow-wrapper mb-4">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full"
            >
                {Array.isArray(banners) && banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet={ImageUrl(banner.mobileImage)}
                            />
                            <img
                                src={ImageUrl(banner.desktopImage)}
                                alt={`Banner ${index + 1}`}
                                className="w-full object-cover"
                            />
                        </picture>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
};

export default Hero;
