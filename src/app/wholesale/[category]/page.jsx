import { getTheme } from "@/services/layout";
import { getCategoryBanners } from "@/services/productService";
import Breadcrum from "@/theme/theme2/components/BreadCrums/Breadcrum";
import { getThemeModules } from "@/theme/themeConfig";
export async function generateMetadata({ params }) {
    const { category } = await params;
    const data = await getCategoryBanners(category)
    return {
        title: data?.title || `Category - ${category}`,
        description: data?.description || `Browse the best products in ${category}`,
    };
}
const WholesaleCategoryPage = async ({ params }) => {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const { category } = await params;
    const { CategoryBanner, WholeSaleProductList } = getThemeModules(currentTheme);
    const data = await getCategoryBanners(category);

    return (
        <>
            {data?.PageWiseBanner?.length > 0 ? <CategoryBanner data={data} /> : <Breadcrum name={data?.name} />}
            <WholeSaleProductList category={category} title={data.name} />
        </>
    )
}
export default WholesaleCategoryPage 