import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const OrderHistoryPage = async() => {
    const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
  const { OrderHistory } = getThemeModules(currentTheme);
  return <OrderHistory />
}
export default OrderHistoryPage