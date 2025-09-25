"use client"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getRelatedCatalogue } from "@/services/catalogueService"
import CatalogueCard from "@/components/cards/CatalogueCard"
const RalatedCatalogue = ({ url }) => {
   const pathname = usePathname();
  const [catalogue, setCatalogue] = useState([])
  const fetchdata = async () => {
    const response = await getRelatedCatalogue(url)
    setCatalogue(response.data)
  }

  useEffect(() => {
    fetchdata()
  }, [url])
  return (
    <div className="relative">
      <SliderNavigation position="center" />

      <Swiper
        grabCursor
        loop={true}
        slidesPerView="auto"
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}>
        {catalogue && catalogue?.length > 0 && catalogue?.map((data, index) => (
          <SwiperSlide key={index} className="flex justify-center h-10 " >
            <CatalogueCard data={data} redirectUrl={pathname?.split("/")?.[2]}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  )
}

export default RalatedCatalogue