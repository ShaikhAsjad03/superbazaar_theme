import { getTheme } from "@/services/layout";
const { getThemeModules } = require("@/theme/themeConfig");
const BrandRetailPage=async({params})=>{
       const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
        const { url } = await params;
        const { BrandRetailList } = getThemeModules(currentTheme);
    return(
<BrandRetailList brand={url}/>
    )
}

export default BrandRetailPage