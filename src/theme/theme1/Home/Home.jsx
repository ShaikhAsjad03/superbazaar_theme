import dynamic from "next/dynamic";
import Banner from "./components/Banner";
import { getHomeBanners, getHomeContent, getHomeProductlist } from "@/services/homeService";
import { getWebSetting } from "@/services/webSetting";
import Popups from "@/components/Popups";
import Slider from "../components/CardsSlider/slider";

const Topcategories = dynamic(() => import("./components/TopCategores"));
const Products = dynamic(() => import("../components/Products/Products"));
const ThreeFourBanner = dynamic(() => import("./components/ThreeFourBanner"));
const CardsSlider3D = dynamic(() => import("../components/CardsSlider/CardsSlider3D"));
const FullSlider = dynamic(() => import("./components/FulSlider"));
const TestimonialSlider = dynamic(() => import("./components/Testimonal"));
const TwoBanner = dynamic(() => import("./components/TwoBanner"));
const NormalSliderCard = dynamic(() => import("../components/CardsSlider/NormalSlider"));

export default async function Home() {
  const [bannerData, homeContent, webSetting] = await Promise.all([
    getHomeBanners(),
    getHomeContent(),
    getWebSetting(),
  ]);

  const homeContentArray = Array.isArray(homeContent) ? homeContent : [];

  const contentWithProducts = await Promise.all(
    homeContentArray.map(async (item) => {
      if (item.type === "product" && item.category?.id) {
        const productsData = await getHomeProductlist(item.category.id, webSetting?.purchaseType);
        return { ...item, products: productsData };
      }
      return item;
    })
  );

  const renderComponent = (item) => {
    switch (item.type) {
      case "full slider":
        return <FullSlider key={item.id} slides={item.data} />;
      case "slider 3d":
        return <CardsSlider3D key={item.id} slides={item.data} />;
      case "cards slider":
        return <Slider key={item.id} slides={item.data} title={item.title}/>;
      case "two banner":
        return <TwoBanner key={item.id} data={item.data} bannergrid={2} htmlContent={item.htmlContent} fullScreen={item.fullScreen} />;
      case "three banner":
        return <ThreeFourBanner key={item.id} data={item.data} bannergrid={3} htmlContent={item.htmlContent} fullScreen={item.fullScreen} />;
      case "four banner":
        return <ThreeFourBanner key={item.id} data={item.data} bannergrid={4} htmlContent={item.htmlContent} fullScreen={item.fullScreen} />;
      case "product":
        return <Products
          key={item.id}
          singleProducts={item.products?.products}
         fullSetProducts={item.products?.catalogue}
          purchaseType={webSetting?.purchaseType}
          url={item?.products?.url}
          title={item.title}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <Banner bannerdata={bannerData} />
      <Topcategories purchaseType={webSetting?.purchaseType} />
      {contentWithProducts.map((item) => renderComponent(item))}
      <TestimonialSlider />
      <Popups />
    </>
  );
}
