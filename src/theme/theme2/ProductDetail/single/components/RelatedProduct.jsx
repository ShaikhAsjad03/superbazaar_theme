"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/theme/theme2/ProductComponent/ProductCard";
import { usePathname } from "next/navigation";
import { getRelatedProduct } from "@/services/productService";

const RealtedProduct = ({ url }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const pathname = usePathname();
  const [ProductData, setProductData] = useState([]);

  const fetchdata = async () => {
    const response = await getRelatedProduct(url);
    setProductData(Array.isArray(response.data) ? response.data : []);
  };

  useEffect(() => {
    fetchdata();
  }, [url]);

  return (
    <section className="pb-0 mb-5 mt-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-center items-center mb-6 text-center ">
          <div>
            <p className="text-[#222222] text-[18px] font-semibold text-center uppercase mt-4"> You may also like this</p>
            <p className="text-gray-500 text-sm lowercase mb-6">TOP SALE IN THIS WEEK</p>
          </div>
        </div>

        <div className="relative">
          <SliderNavigation position="center" ref={prevRef} />

          <Swiper
            grabCursor
            loop={true}
            slidesPerView="auto"
            spaceBetween={16}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {Array.isArray(ProductData) &&
              ProductData.map((item, index) => (
                <SwiperSlide
                  key={item.id || index}
                  className="flex justify-center"
                  style={{ width: "305px" }}
                >
                  <ProductCard product={item} pathname={item.url} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RealtedProduct;
