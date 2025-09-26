"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import Image from "next/image"
import { Quote } from "lucide-react"
import { ImageUrl } from "@/helper/imageUrl"
import { useEffect, useState } from "react"
import { getTestimonal } from "@/services/homeService"
const TestimonialSlider = () => {
    const [data, setData] = useState([])
    const fetchdata = async () => {
        const data = await getTestimonal()
        setData(data)
    }

    useEffect(() => {
        fetchdata()
    }, [])
    return (
        data && data?.length > 0 && (
        <div className="mt-10 w-full bg-gradient-to-r from-indigo-100 via-white to-indigo-100 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Discover how our products and services have made a difference in the lives of our customers.
                </p>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="max-w-7xl mx-auto"
                >
                    { data?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center relative h-full">
                                <Quote className="absolute top-1 left-4 text-indigo-400 w-8 h-8 opacity-70" />
                                <div className="w-20 h-22 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-indigo-100">
                                    <Image
                                        src={ImageUrl(item.image)}
                                        alt={item?.customer_name || "Client testimonial image"}
                                        height={300}
                                        width={300}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-2">
                                    {item.customer_name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                    {item.review}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        )
    )
}

export default TestimonialSlider
