import { createClientAxios, createServerAxios } from "./apiClient";
export const getPageBanners = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/page-banner/${url}`);
    return res.data?.data || {};
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getCategoryProducts = async (
  url,
  pageNo = 1,
  perPage = 20,
  sortOption = "",
  finalFilters = {},
  isServer = false
) => {
  try {
    const axiosInstance = isServer ? await createServerAxios() : createClientAxios();
    const res = await axiosInstance.get(`/public/product/${url}`, {
      params: {
        perPage,
        pageNo,
        sortOption,
        ...finalFilters,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getCategoryFilter = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/filter/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category filter   :", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getProductdetail = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/product-detail/${url}`);
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getProductStitching = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/product-stitching/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product stitching:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getProductAttributes = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/product-attributes/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product attributes:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getRelatedProduct = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/related-product/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getWholeSaleProductslists = async (
  url,
  pageNo = 1,
  perPage = 20,
  sortOption = "",
  isServer = false
) => {
  try {
    const axiosInstance = isServer ? await createServerAxios() : createClientAxios();
    const res = await axiosInstance.get(`/public/catalogue/${url}`, {
      params: {
        perPage,
        pageNo,
        sortOption,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};