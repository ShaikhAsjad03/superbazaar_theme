import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

export default async function BrandListPage() {
    const themeData = await getTheme();
    const currentTheme = themeData?.name || "theme1";
    const { BrandList } = getThemeModules(currentTheme);
    return <BrandList />;
}
