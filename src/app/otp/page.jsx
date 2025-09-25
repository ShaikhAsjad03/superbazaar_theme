import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
import { redirect } from "next/navigation";

export default async function OtpRoute() {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const OTP = getThemeModules(currentTheme).OTP;
    if (!OTP) {
        redirect("/");
    }
    return <OTP />;
}
