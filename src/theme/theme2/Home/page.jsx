
// import { getHomeBanners, getHomeContent, getHomeProductlist } from "@/services/homeService";
// import { getWebSetting } from "@/services/webSetting";
// import Popups from "@/components/Popups";
// import Hero from "../components/Hero/Hero";
// import TrendingLehengas from "./component/TrendingLehengas";
// import Collection from "./component/Collection";
// import Testimonial from "./component/Testimonial";

// export default async function Home() {
//     const [bannerdata,
//         HomeContent,
//         webSetting

//     ] = await Promise.all([getHomeBanners(), getHomeContent(), getWebSetting()]);
//     const homeContentArray = Array.isArray(HomeContent) ? HomeContent : [];
//     const productBlocks = homeContentArray.filter(
//         (item) => item?.type === "product" && item.categoryId
//     );

//     const productTabsData = await Promise.all(
//         productBlocks.map(async (block) => {
//             const products = await getHomeProductlist(block.category?.url, webSetting?.purchaseType);
//             return products;
//         })
//     );

//     return (
//         <>
//             <Hero banners={bannerdata} />
//             <TrendingLehengas tabsData={productTabsData} webSetting={webSetting} />
//             <Collection homeContent={HomeContent} webSetting={webSetting} productTabsData={productTabsData} />
//             <Testimonial />
//             <Popups />
//         </>
//     )
// }

import dynamic from "next/dynamic";
import { getHomeBanners, getHomeContent, getHomeProductlist } from "@/services/homeService";
import { getWebSetting } from "@/services/webSetting";
import Popups from "@/components/Popups";
import Hero from "../components/Hero/Hero";
import Testimonial from "./component/Testimonial";

// Lazy load heavier sections
const TrendingLehengas = dynamic(() => import("./component/TrendingLehengas"));
const Collection = dynamic(() => import("./component/Collection"));

export default async function Home() {
    // 🧠 Fetch all essential data in parallel
    const [bannerData, homeContent, webSetting] = await Promise.all([
        getHomeBanners(),
        getHomeContent(),
        getWebSetting(),
    ]);

    const homeContentArray = Array.isArray(homeContent) ? homeContent : [];

    // 🛍️ Filter blocks of type "product"
    const productBlocks = homeContentArray.filter(
        (item) => item?.type === "product" && item.category?.id
    );

    // ⚙️ Fetch product lists for each block
    const productTabsData = await Promise.all(
        productBlocks.map(async (block) => {
            const products = await getHomeProductlist(
                block.category?.id,
                webSetting?.purchaseType
            );
            return {
                ...block,
                products: products?.products || [],
                catalogue: products?.catalogue || [],
            };
        })
    );

    // 🧩 Render the Home page
    return (
        <>
            <Hero banners={bannerData} />
            <TrendingLehengas tabsData={productTabsData} webSetting={webSetting} />
            <Collection
                homeContent={homeContent}
                webSetting={webSetting}
                productTabsData={productTabsData}
            />
            <Testimonial />
            <Popups />
        </>
    );
}
