import { getTheme } from "@/services/layout";

const { getThemeModules } = require("@/theme/themeConfig");
const BrandCataloguePage=async({params})=>{
       const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
        const { url } = await params;
        const { BrandCatalogueList } = getThemeModules(currentTheme);
    return(
<BrandCatalogueList brands={url}/>
    )
}

export default BrandCataloguePage