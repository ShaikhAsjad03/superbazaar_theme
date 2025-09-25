import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

const WholeSale=async()=>{
      const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
        const { WholeSalePage} = getThemeModules(currentTheme);
    return(
        <WholeSalePage/>
    )
}
export default WholeSale