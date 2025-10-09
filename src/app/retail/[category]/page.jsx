import { getTheme } from "@/services/layout";
import { getPageBanners, getCategoryFilter, getCategoryProducts } from "@/services/productService";
import { getWebSetting } from "@/services/webSetting";
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

const RetailCategoryPage = async ({ params }) => {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const { category } = await params;
    const { PageBanner, Products } = getThemeModules(currentTheme);
    const webSetting = await getWebSetting();
    return (
        <>
            <PageBanner url={category} />
            <Products category={category} title={""} webSetting={webSetting} />
        </>
    )
}



export default RetailCategoryPage 