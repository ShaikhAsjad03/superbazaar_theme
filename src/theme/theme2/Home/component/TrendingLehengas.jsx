"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation";
import Link from "next/link";
import CatalogCard from "../../ProductDetail/wholesale/component/CatalogCard";
import ProductCard from "../../ProductComponent/ProductCard";
import { useMemo } from "react";

const ProductSkeleton = () => (
    <div className="h-60 w-40 bg-gray-200 animate-pulse rounded" />
);

const TrendingLehengas = ({ tabsData, webSetting, isLoading }) => {
    const purchaseType = webSetting?.purchaseType || "retail";
    const memoizedTabsData = useMemo(() => {
        return Array.isArray(tabsData)
            ? tabsData.map(block => ({
                ...block,
                filteredProducts: webSetting?.purchaseType === "retail"
                    ? block?.products || []
                    : block?.catalogue || []
            }))
            : [];
    }, [tabsData]);

    return (
        <div className="container mx-auto px-4 mt-7">
            {isLoading ? (
                <div className="flex gap-4">
                    {[...Array(4)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            ) : (

                memoizedTabsData.map((block, idx) => (
                    <div key={idx} className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[#222222] text-[20px] font-semibold text-center">
                                {block.title}
                            </p>

                            <Link
                                href={
                                    webSetting.purchaseType === "retail"
                                        ? `/retail/${block.url}`
                                        : `/wholesale/${block.url}`
                                }
                                className="text-sm md:text-base font-bold hover:text-red-400 transition"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="relative mx-auto px-4 sm:px-6 md:px-0 w-full">
                            <SliderNavigation
                                position="center"
                                prevClass={`swiper-button-prev-${idx}`}
                                nextClass={`swiper-button-next-${idx}`}
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
                                    nextEl: `.swiper-button-next-${idx}`,
                                    prevEl: `.swiper-button-prev-${idx}`,
                                }}
                                modules={[Autoplay, Navigation]}
                                className="w-full"
                                breakpoints={{
                                    0: { slidesPerView: 2, spaceBetween: 10 },
                                    360: { slidesPerView: 2, spaceBetween: 12 },
                                    480: { slidesPerView: 2, spaceBetween: 14 },
                                    640: { slidesPerView: 3, spaceBetween: 16 },
                                    768: { slidesPerView: 3, spaceBetween: 18 },
                                    1024: { slidesPerView: 3, spaceBetween: 20 },
                                    1280: { slidesPerView: 4, spaceBetween: 24 },
                                }}
                            >
                                {block.filteredProducts.map((data, i) => (
                                    <SwiperSlide key={i} className="flex justify-center">
                                        {webSetting?.purchaseType === "retail" ? (
                                            <ProductCard
                                                key={data.id}
                                                product={data}
                                                webSetting={webSetting}
                                                pathname={purchaseType === "retail"
                                                    ? `/retail/${block.url}/${data?.url || "/"}`
                                                    : `/wholesale/${block.url}/${data?.url || "/"}`
                                                }
                                            />
                                        ) : (
                                            <CatalogCard
                                                product={data}
                                                category={block.url}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                ))
            )}
        </div >
    );
};

export default TrendingLehengas;
