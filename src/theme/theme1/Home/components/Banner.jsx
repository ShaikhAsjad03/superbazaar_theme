"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";

const Banner = ({ bannerdata }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getHeight = () => (isMobile ? 450 : 450);

  return (
    <section className="slideshow-wrapper mb-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {Array.isArray(bannerdata) && bannerdata.map((banner, index) => (
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
      <style jsx global>{`
         .swiper-pagination {
           bottom: 15px !important;
           display: flex;
           justify-content: center;
           gap: 12px;
         }
         .swiper-pagination-bullet {
           position: relative;
           width: 16px;
           height: 16px;
           background: transparent;
           border-radius: 50%;
           border: 2px solid #fff;
           opacity: 1;
           transition: all 0.3s;
           box-sizing: border-box;
         }
         .swiper-pagination-bullet::after {
           content: "";
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 5px;
           height: 5px;
           background: white;
           border-radius: 50%;
         }
         .swiper-pagination-bullet-active::after {
           width: 9px;
          height: 9px;
         }
       `}</style>
    </section>
  );
};

export default Banner;
