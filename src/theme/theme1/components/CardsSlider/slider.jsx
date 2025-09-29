"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import Image from "next/image"
import SliderNavigation from "./SliderNavigation"
import { ImageUrl } from "@/helper/imageUrl"

const Slider = ({ slides,title }) => {
  return (
    <div className="mx-auto px-4 mt-10  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px]
  2xl:max-w-[1320px]">

     {title && (
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-left">
          {title}
        </h2>
      )}

      <div className="relative mx-auto  w-full">
        <SliderNavigation
          position="center"
          prevClass={`swiper-button-prev`}
          nextClass={`swiper-button-next`}
        />
        <Swiper
          grabCursor
          loop
          slidesPerView="auto"
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: `.swiper-button-next`,
            prevEl: `.swiper-button-prev`,
          }}
          modules={[Autoplay, Navigation]}
          className="w-full"
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            360: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {slides.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="relative overflow-hidden shadow-lg bg-white rounded-lg group"
              >
                <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[300px]">
                  <Image
                    src={ImageUrl(item.image)}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    // className="object-cover"
                  />
                  {item.buttonText && (
                    <a
                      href={item.link || "#"}
  className="absolute bottom-0 left-0 w-full bg-zinc-900 text-white text-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"                    >
                      {item.buttonText}
                    </a>
                  )}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default Slider
