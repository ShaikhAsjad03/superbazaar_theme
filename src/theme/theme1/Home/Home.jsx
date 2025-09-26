import dynamic from "next/dynamic";
import Banner from "./components/Banner";
import { getHomeBanners, getHomeContent, getHomeProductlist } from "@/services/homeService";
import { getWebSetting } from "@/services/webSetting";
import Popups from "@/components/Popups";
import NormalSliderCard from "../components/CardsSlider/NormalSlider";
const Topcategories = dynamic(() => import("./components/TopCategores"))
const Products = dynamic(() => import("../components/Products/Products"))
const ThreeFourBanner = dynamic(() => import("./components/ThreeFourBanner"))
const CardsSlider3D = dynamic(() => import("../components/CardsSlider/CardsSlider3D"))
const FullSlider = dynamic(() => import("./components/FulSlider"))
const TestimonialSlider = dynamic(() => import("./components/Testimonal"))
const TwoBanner = dynamic(() => import("./components/TwoBanner"))
export default async function Home() {
  const
    [bannerdata,
      HomeContent,
      webSetting,
    ] = await Promise.all(
      [getHomeBanners(), getHomeContent(), getWebSetting(),]);
  const homeContentArray = Array.isArray(HomeContent) ? HomeContent : [];
  const productBlocks = homeContentArray.filter(
    (item) => item?.type === "product" && item.categoryId
  );
  const productTabsData = await Promise.all(
    productBlocks.map(async (block) => {
      const products = await getHomeProductlist(block.category?.url, webSetting?.purchaseType);
      return {
        title: block.title,
        url: block.category?.url,
        products,
      };
    })
  );


  const componentMap = {
    "full slider": (item) => <FullSlider key={item.id} slides={item.data} />,
    "slider 3d": (item) => <CardsSlider3D key={item.id} slides={item.data} />,
    "cards slider": (item) => <NormalSliderCard key={item.id} slides={item.data} />,
    "two banner": (item) => <TwoBanner key={item.id} data={item.data} bannergrid={2} htmlContent={item.htmlContent} fullScreen={item.fullScreen}/>,
    "three banner": (item) => <ThreeFourBanner key={item.id} data={item.data} bannergrid={3} htmlContent={item.htmlContent} fullScreen={item.fullScreen}/>,
    "four banner": (item) => <ThreeFourBanner key={item.id} data={item.data} bannergrid={4} htmlContent={item.htmlContent} fullScreen={item.fullScreen}/>,
  };
  return (
    <>
      <Banner bannerdata={bannerdata} />
      <Topcategories purchaseType={webSetting?.purchaseType} />
      {productTabsData.length > 0 && <Products tabsData={productTabsData} purchaseType={webSetting?.purchaseType} />}
      {homeContentArray.map((item) => {
        const renderFn = componentMap[item.type];

        return renderFn ? renderFn(item) : null;
      })}
      <TestimonialSlider />
      <Popups />
    </>
  );
}
