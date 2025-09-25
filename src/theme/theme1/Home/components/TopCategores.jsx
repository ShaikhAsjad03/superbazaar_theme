"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Link from "next/link"
import "swiper/css"
import { ImageUrl } from "@/helper/imageUrl"
import { getCategorySlider } from "@/services/homeService"
import { useEffect, useState } from "react"

const Topcategories = ({purchaseType }) => {
    const [data,setData]=useState([])
     const fetchdata=async()=>{
     const data= await getCategorySlider()
     setData(data)
     }
  
     useEffect(()=>{
      fetchdata()
     },[])
  return (
    <div
      className="mx-auto px-5 mt-10 w-full
      sm:max-w-[680px] 
      md:max-w-[980px] 
      lg:max-w-[980px] 
      xl:max-w-[1280px] 
      2xl:max-w-[1320px]"
    >
      {data && data.length > 0 && (
  <h1 className="text-xl sm:text-2xl md:text-2xl text-center mb-6 text-zinc-900">
    Shop by Categories
  </h1>
)}


      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 10 },
          640: { slidesPerView: 4, spaceBetween: 10 },
          768: { slidesPerView: 6, spaceBetween: 10 },
          1024: { slidesPerView: 7, spaceBetween: 10 },
          1280: { slidesPerView: 8, spaceBetween: 10 },
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Link href={purchaseType === "wholesale" ? `/wholesale/${item.url}` : `/retail/${item.url}`
              } className="block group">
                <div className="relative w-full max-w-[120px] aspect-square">
                  <Image
                    src={ImageUrl(item.image)}
                    alt={`Category ${item.name}`}
                    fill
                    className="rounded-xl border border-gray-200 shadow-md object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-center text-xs sm:text-sm md:text-base font-medium text-zinc-950 group-hover:text-gray-700 transition-colors break-words">
                  {item?.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Topcategories
