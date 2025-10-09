import { getTheme } from "@/services/layout";
import { getPageBanners } from "@/services/productService";
import Breadcrum from "@/theme/theme2/components/BreadCrums/Breadcrum";
import { getThemeModules } from "@/theme/themeConfig";
export async function generateMetadata({ params }) {
    const { category } = await params;
    const data = await getPageBanners(category)
    return {
        title: data?.title || `Category - ${category}`,
        description: data?.description || `Browse the best products in ${category}`,
    };
}
const WholesaleCategoryPage = async ({ params }) => {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const { category } = await params;
    const { PageBanner, WholeSaleProductList } = getThemeModules(currentTheme);
    return (
        <>
             <PageBanner url={category} /> 
            <WholeSaleProductList category={category}  />
        </>
    )
}
export default WholesaleCategoryPage 