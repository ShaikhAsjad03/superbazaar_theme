"use client"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SliderNavigation from "../CardsSlider/SliderNavigation"
import CatalogueCard from "../../../../components/cards/CatalogueCard"
import HomeProductCard from "@/components/cards/HomeProductCard"
import { useSelector } from "react-redux"

const Products = ({ fullSetProducts = [], singleProducts = [], url, title }) => {
  const { webSetting } = useSelector((state) => state.webSetting);
  const [activeTab, setActiveTab] = useState("wholesale")

  useEffect(() => {
    if (webSetting?.purchaseType === "wholesale") {
      setActiveTab("wholesale")
    } else if (webSetting?.purchaseType === "retail") {
      setActiveTab("retail")
    }
  }, [webSetting?.purchaseType])


  const tabsData = [
    { title: "Full Set", url: "wholesale" },
    { title: "Single", url: "retail" },
  ]

  const displayedProducts = activeTab === "wholesale" ? fullSetProducts : singleProducts
  const prevClass = `swiper-button-prev-${url}`;
  const nextClass = `swiper-button-next-${url}`;
  return (
    <div className="mx-auto px-4 mt-10  
      w-full 
      sm:max-w-[540px] 
      md:max-w-[720px] 
      lg:max-w-[960px] 
      xl:max-w-[1240px]
      2xl:max-w-[1320px]">

      {title && (
        <h1 className="text-xl font-medium text-center mb-2">{title}</h1>
      )}

      <div className="w-full flex justify-center items-center gap-6 mb-8">
        {tabsData.map((tab) => (
          <button
            key={tab.url}
            onClick={() => setActiveTab(tab.url)}
            className={`pb-2 text-sm sm:text-base md:text-md lg:text-lg font-medium transition-colors duration-300
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
          <SliderNavigation position="center" prevClass={prevClass} nextClass={nextClass} />
          <Swiper
            grabCursor
            loop
            slidesPerView={2}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
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
