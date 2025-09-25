import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

const AccountLayout =async ({ children }) => {
  const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
  const { AccountsLayout } = getThemeModules(currentTheme);

  return <AccountsLayout>{children}</AccountsLayout>;
}
export default AccountLayout;
