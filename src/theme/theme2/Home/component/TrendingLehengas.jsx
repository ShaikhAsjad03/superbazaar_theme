"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation";
import CatalogCard from "../../ProductDetail/wholesale/component/CatalogCard";
import ProductCard from "../../ProductComponent/ProductCard";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ProductSkeleton = () => (
    <div className="h-60 w-40 bg-gray-200 animate-pulse rounded" />
);

const TrendingLehengas = ({ tabsData, webSetting, isLoading }) => {
    const purchaseType = webSetting?.purchaseType;
    const router = useRouter();

    // Tab options
    const tabData = [
        { title: "Full Set", key: "wholesale", url: "wholesale" },
        { title: "Single", key: "retail", url: "retail" },
    ];

    // 🔹 Maintain tab state per block index, with default based on purchaseType
    const [activeTabs, setActiveTabs] = useState(() => {
        if (!Array.isArray(tabsData)) return {};
        const defaultTab = purchaseType === "wholesale" ? "wholesale" : "retail";
        const initialTabs = {};
        tabsData.forEach((_, idx) => {
            initialTabs[idx] = defaultTab;
        });
        return initialTabs;
    });

    const handleTabClick = (idx, key) => {
        setActiveTabs((prev) => ({
            ...prev,
            [idx]: key, // update only this block's tab
        }));
    };

    // Prepare products for each block
    const memoizedTabsData = useMemo(() => {
        return Array.isArray(tabsData)
            ? tabsData.map((block) => ({
                ...block,
                retailProducts: block?.products || [],
                wholesaleProducts: block?.catalogue || [],
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
                memoizedTabsData.map((block, idx) => {
                    const currentTab = activeTabs[idx] || "retail";
                    const products =
                        currentTab === "retail" ? block.retailProducts : block.wholesaleProducts;
                    return (
                        <div key={idx} className="mb-6">
                            {/* Header and Tabs */}
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-zinc-950 text-[20px] font-semibold text-center">
                                    {block.title}
                                </p>
                                <div className="relative flex gap-6 mb-3 border-b border-gray-200">
                                    {tabData.map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => handleTabClick(idx, tab.key)}
                                            className={`relative pb-2 text-[18px] font-medium transition-colors duration-300 ${currentTab === tab.key
                                                ? "text-red-800"
                                                : "text-black hover:text-gray-700"
                                                }`}
                                        >
                                            {tab.title}
                                        </button>
                                    ))}

                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 bg-red-800"
                                        style={{
                                            width: `${100 / tabData.length}%`,
                                            transform: `translateX(${tabData.findIndex((t) => t.key === currentTab) * 100
                                                }%)`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="relative mx-auto px-4 sm:px-6 md:px-0 w-full">
                                {products.length > 6 && <SliderNavigation
                                    position="center"
                                    prevClass={`swiper-button-prev-${idx}`}
                                    nextClass={`swiper-button-next-${idx}`}
                                />}

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
                                        1024: { slidesPerView: 4, spaceBetween: 20 },
                                        1280: { slidesPerView: 5, spaceBetween: 24 },
                                    }}
                                >
                                    {products.map((data, i) => (
                                        <SwiperSlide key={i} className="flex justify-center">
                                            {currentTab === "retail" ? (
                                                <ProductCard
                                                    key={data.id}
                                                    product={data}
                                                    webSetting={webSetting}
                                                    pathname={`/retail/${block.url}/${data?.url || ""}`}
                                                />
                                            ) : (
                                                <CatalogCard product={data} category={block.url} />
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TrendingLehengas;
