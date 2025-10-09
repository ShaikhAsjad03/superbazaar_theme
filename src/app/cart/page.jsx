import { getTheme } from "@/services/layout";
import { getWebSetting } from "@/services/webSetting";
import { getThemeModules } from "@/theme/themeConfig";

export default async function CartPage() {
  const themeData = await getTheme();
  const currentTheme = themeData?.name || "theme1";
  const Cart = getThemeModules(currentTheme).Cart;
  const webSetting = await getWebSetting();
  return <Cart webSetting={webSetting} />;
}
