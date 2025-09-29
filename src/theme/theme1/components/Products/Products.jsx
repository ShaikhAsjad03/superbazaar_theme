"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SliderNavigation from "../CardsSlider/SliderNavigation"
import CatalogueCard from "../../../../components/cards/CatalogueCard"
import HomeProductCard from "@/components/cards/HomeProductCard"

const Products = ({ fullSetProducts = [], singleProducts = [], url }) => {
  const [activeTab, setActiveTab] = useState("wholesale")

  const tabsData = [
    { title: "Full Set", url: "wholesale" },
    { title: "Single", url: "retail" },
  ]

  const displayedProducts = activeTab === "wholesale" ? fullSetProducts : singleProducts

  return (
    <div className="mx-auto px-4 mt-10  
      w-full 
      sm:max-w-[540px] 
      md:max-w-[720px] 
      lg:max-w-[960px] 
      xl:max-w-[1240px]
      2xl:max-w-[1320px]">
      
      <div className="w-full flex justify-center items-center gap-6 mb-8">
        {tabsData.map((tab) => (
          <button
            key={tab.url}
            onClick={() => setActiveTab(tab.url)}
            className={`pb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-colors duration-300
              ${activeTab === tab.url
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full">
        <div className="relative w-full">
          <SliderNavigation position="center" />
          <Swiper
            grabCursor
            loop
            slidesPerView={2} 
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
            modules={[Autoplay, Navigation]}
            className="w-full"
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 18 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {displayedProducts?.map((data, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                {activeTab === "wholesale" ? (
                  <CatalogueCard data={data} redirectUrl={`catalogue/${url || ""}`} />
                ) : (
                  <HomeProductCard data={data} redirectUrl={url || ""} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Products
