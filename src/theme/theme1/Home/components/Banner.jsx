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
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
        }}
        className=""
      >
        {bannerdata &&
          bannerdata.length > 0 &&
          bannerdata.map((slide) => {
            const imageSrc = ImageUrl(isMobile ? slide.mobileImage : slide.desktopImage);
            return (
              <SwiperSlide key={slide.position}>
                <div className="relative w-full" style={{ height: getHeight() }}>
                  <Image
                    src={imageSrc}
                    alt={slide.url || "Banner Image"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          })}
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
    </div>
  );
};

export default Banner;
