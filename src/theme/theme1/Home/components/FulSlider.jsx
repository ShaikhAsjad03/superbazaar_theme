"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";

const FullSlider = ({ slides = [] }) => {
  if (!slides.length) return null;

  return (
    <div className="mt-7">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
       <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={ImageUrl(slide.image)}
                alt={slide.title || "Slider Image"}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullSlider;
