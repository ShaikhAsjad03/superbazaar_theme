import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const AddressPage = async() => {
  const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
  const { Address } = getThemeModules(currentTheme);
  return <Address />
}
export default AddressPage