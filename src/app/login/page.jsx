import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";
export default async function LoginRoute() {
     const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
    const Login = getThemeModules(currentTheme).Login;
    if (!Login) {
        redirect("/");
    }
    return <Login />;
}
