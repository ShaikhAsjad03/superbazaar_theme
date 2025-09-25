import dynamic from "next/dynamic";
const load = (importFn) => dynamic(importFn, { ssr: true });
const Empty = () => null;
export const getThemeModules = (theme = "theme1") => {
  switch (theme) {
    case "theme1":
      return {
        layout: load(() => import("./theme1/layout")),
        CategoryBanner: load(() => import("./theme1/CategoriesPage/CategoryBannertheme1")),
        Products: load(() => import("./theme1/CategoriesPage/Retail/Productstheme1")),
        Home: load(() => import("./theme1/Home/Home")),
        AccountDetail: load(() => import("./theme1/Accounts/components/AccountDetailtheme1")),
        Cart: load(() => import("./theme1/Cart/CartPage")),
        Address: load(() => import("./theme1/Accounts/components/Address")),
        OrderHistory: load(() => import("./theme1/Accounts/components/OrderHistory")),
        Wishlist: load(() => import("./theme1/Accounts/components/Whishlist")),
        AccountsLayout: load(() => import("./theme1/Accounts/layout")),
        ProductDetail: load(() => import("./theme1/ProductDetail/single/ProductDetail")),
        WholeSaleProductList: load(() => import("./theme1/CategoriesPage/Wholesale/WholeSaleProductList")),
        BrandList: load(() => import("./theme1/brands/brandLists")),
        BrandCatalogueList: load(() => import("./theme1/brands/brandCatalogueList")),
        Catalogue: load(() => import("./theme1/ProductDetail/catalogue/catalogue")),
        WholeSalePage: load(() => import("./theme1/wholesalePage/wholesalepage")),
        OrderDetail: load(() => import("./theme1/Accounts/components/orderDetails")),
        Invoice: load(() => import("./theme1/Accounts/components/Invoice")),
        Search: load(() => import("./theme1/Search/search")),
        ConfirmPassword: Empty

      };

    case "theme2":
      return {
        layout: load(() => import("./theme2/layout")),
        CategoryBanner: load(() => import("./theme2/CategoriesPage/CategoryBannertheme2")),
        Products: load(() => import("./theme2/CategoriesPage/Productstheme2")),
        Home: load(() => import("./theme2/Home/page")),
        AccountDetail: load(() => import("./theme2/Accounts/components/AccountDetailtheme2")),
        Address: load(() => import("./theme2/Accounts/components/Address")),
        OrderHistory: load(() => import("./theme2/Accounts/components/OrderHistory")),
        Wishlist: load(() => import("./theme2/Accounts/components/Whishlist")),
        AccountsLayout: load(() => import("./theme2/Accounts/layout")),
        ProductDetail: load(() => import("./theme2/ProductDetail/single/ProductDetail")),
        Login: load(() => import("./theme2/auth/Login")),
        Signup: load(() => import("./theme2/auth/Signup")),
        ForgotPassword: load(() => import("./theme2/auth/ForgotPassword")),
        OTP: load(() => import("./theme2/auth/OtpPage")),
        ConfirmPassword: load(() => import("./theme2/auth/ConfirmPassword")),
        Catalogue: load(() => import("./theme2/ProductDetail/catalogue/catalogue")),
        BrandList: load(() => import("./theme2/brands/brandLists")),
        WholeSalePage: load(() => import("./theme2/wholesalePage/wholesalepage")),
        BrandCatalogueList: load(() => import("./theme2/brands/brandCatalogueList")),
        WholeSaleProductList: load(() => import("./theme2/ProductDetail/wholesale/WholesaleProduct")),
        OrderDetail: load(() => import("./theme1/Accounts/components/orderDetails")),
        Invoice: load(() => import("./theme1/Accounts/components/Invoice")),
        Cart: load(() => import("./theme2/Cart/CartPage")),
        Search: load(() => import("./theme2/Search/search")),

      };
    default:
      return getThemeModules("theme1");
  }
};

export const getThemeLayout = (theme = "theme1") => {
  return getThemeModules(theme).layout;
};