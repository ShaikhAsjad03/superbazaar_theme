"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import Image from "next/image"
import { ImageUrl } from "@/helper/imageUrl"

const CardsSlider3D = ({ slides }) => {
  return (
    <div className="w-full  py-10 mt-10">
      <h1 className="text-3xl text-center mb-6">Shop By Video</h1>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        loop={true}
        slidesPerView={5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 6,
          stretch: 20,
          depth: 50,
          modifier: 2.6,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
         breakpoints={{
    0: {
      slidesPerView: 1, 
    },
    640: {
      slidesPerView: 3, 
    },
    1024: {
      slidesPerView: 3, 
    },
    1280: {
      slidesPerView: 5, 
    },
  }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="max-w-6xl mx-auto"       >
        {slides.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[280px] !h-[380px] flex justify-center items-center"
          >
            <div className="relative w-[280px] h-[380px]">
              <Image
                src={ImageUrl(item.image)}
                alt={`Slide ${index + 1}`}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  )
}

export default CardsSlider3D
