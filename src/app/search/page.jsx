import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";
const SearchPage =async () => {
      const themeData = await getTheme();
      const currentTheme = themeData?.name || "theme1"; 
    const { Search } = getThemeModules(currentTheme);
    return (
        <Search />
    );
};

export default SearchPage;
