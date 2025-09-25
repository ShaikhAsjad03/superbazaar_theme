import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const OrderDetailPage = async ({ params }) => {
    const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
    const { orderId } = await params;
    const { OrderDetail } = getThemeModules(currentTheme);
    return (
        <OrderDetail orderid={orderId} />
    )
}

export default OrderDetailPage