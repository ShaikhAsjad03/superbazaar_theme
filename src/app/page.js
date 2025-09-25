import { getTheme } from "@/services/layout";
import { getThemeModules } from "@/theme/themeConfig";

const HomePage = async () => {
  const themeData = await getTheme();
  const currentTheme = themeData?.name || "theme1";
  const { Home } = getThemeModules(currentTheme);

  return <Home />;
};

export default HomePage;
