"use client";
import React from "react";
import dynamic from "next/dynamic";

const ThreeFourBanner = dynamic(() => import("@/theme/theme1/Home/components/ThreeFourBanner"));
const FullSlider = dynamic(() => import("@/theme/theme1/Home/components/FulSlider"));
const TwoBanner = dynamic(() => import("@/theme/theme1/Home/components/TwoBanner"));
const NormalSliderCard = dynamic(() => import("@/theme/theme1/components/CardsSlider/NormalSlider"));

const componentMap = {
    "full slider": (item) => <FullSlider key={item.id} slides={item.data} />,
    "cards slider": (item) => <NormalSliderCard key={item.id} slides={item.data} />,
    "two banner": (item) => <TwoBanner key={item.id} data={item.data} bannergrid={2} htmlContent={item.htmlContent} />,
    "three banner": (item) => <ThreeFourBanner key={item.id} data={item.data} bannergrid={3} htmlContent={item.htmlContent} />,
    "four banner": (item) => <ThreeFourBanner key={item.id} data={item.data} bannergrid={4} htmlContent={item.htmlContent} />,
};

const Collection = ({ homeContent = [] }) => {
    return (
        <div className="container mx-auto px-4 mt-3 mb-0">
            {homeContent.map((collection, idx) => {
                const RenderComponent = componentMap[collection.type];
                const renderFn = componentMap[collection.type];
                return renderFn ? RenderComponent(collection) : null;
            })}
        </div>
    );
};

export default Collection;
