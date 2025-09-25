import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getUserInfo } from "@/services/accountsService";
import { getThemeModules } from "@/theme/themeConfig";
import { getTheme } from "@/services/layout";
const AccountDetailsPag = async () => {
    const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
  const session = await getServerSession(authOptions);
  const { id } = session?.user
  const data = await getUserInfo(id)
  const { AccountDetail } = getThemeModules(currentTheme);
  return <AccountDetail data={data} />
}
export default AccountDetailsPag