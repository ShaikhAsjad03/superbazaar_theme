"use client"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation"
import ProductCard from "@/components/cards/ProductCards"
import { useEffect, useState } from "react"
import { getRelatedProduct } from "@/services/productService"
import { usePathname } from "next/navigation"
const RalatedProduct = ({ url }) => {
  const pathname = usePathname();
  const [ProductData, setProductData] = useState([])
  const fetchdata = async () => {
    const response = await getRelatedProduct(url)
    setProductData(response.data)
  }

  useEffect(() => {
    fetchdata()
  }, [url])
  return (
    ProductData && ProductData?.length > 0 && (
      <>
        <h1 className="text-2xl font-normal text-center mb-10">You May Also Like this</h1>
        <div className="relative">

          <SliderNavigation position="center" />

          <Swiper
            grabCursor
            loop={true}
            slidesPerView="auto"
            spaceBetween={10}
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
            {ProductData && ProductData?.length > 0 && ProductData?.map((product, index) => (
              <SwiperSlide key={index} className="flex justify-center h:md-100 " style={{ width: '320px' }} >
                <ProductCard data={product} redirectUrl={pathname?.split("/")?.[2]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    )
  )
}

export default RalatedProduct