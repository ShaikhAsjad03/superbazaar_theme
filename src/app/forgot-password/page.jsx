import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";

export default async function ForgotRoute() {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const ForgotPassword = getThemeModules(currentTheme).ForgotPassword;
    if (!ForgotPassword) {
        redirect("/");
    }
    return <ForgotPassword />;
}
