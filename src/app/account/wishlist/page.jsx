import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const WishlistPage = async() => {
    const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
  const { Wishlist } = getThemeModules(currentTheme);
  return <Wishlist />
}
export default WishlistPage