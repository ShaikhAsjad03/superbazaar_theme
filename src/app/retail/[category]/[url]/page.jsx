import { getTheme } from "@/services/layout";
import { getProductAttributes, getProductdetail, getProductStitching } from "@/services/productService";
import { getThemeModules } from "@/theme/themeConfig";





export async function generateMetadata({ params }) {
    const { url } = await params;
    const data = await getProductdetail(url)
    return {
        title: data?.title || ` ${url}`,
        description: data?.description || `Browse the best products in ${url}`,
    };
}


const ProductDetailpage = async ({ params }) => {
  const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
          const { category, url } = await params;
    const { ProductDetail } = getThemeModules(currentTheme);

    const [data, stitching, attributes] = await Promise.all([
        getProductdetail(url),
        getProductStitching(url),
        getProductAttributes(url),
    ]);

    return (
        <ProductDetail
            product={data.data}
            Stitching={stitching.data}
            attributes={attributes.data}
            category={category} />
    )
}

export default ProductDetailpage;