import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

const Invoice=async({params})=> {
  const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
    const { orderId } = await params;
    const { Invoice } = getThemeModules(currentTheme);

  return (
   <Invoice orderId={orderId}/>
  );
}
export default Invoice
