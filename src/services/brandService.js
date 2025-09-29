import { createClientAxios } from "./apiClient";

export const getBrandListing = async (perPage,pageNo,search) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/brands?perPage=${perPage}&pageNo=${pageNo}&search=${search}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getBrandCatalogueListing = async (data) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/public/brand-catalogue`,data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getBrandProducts = async (
  brand,
  pageNo = 1,
  perPage = 20,
  sortOption = "",
  finalFilters = {},
  isServer = false
) => {
  try {
    const axiosInstance = isServer ? await createServerAxios() : createClientAxios();

    const res = await axiosInstance.post(
      `/public/brand-product`, 
      {
        url: brand,
        perPage,
        pageNo,
        sortOption,
      },
      {
        params: finalFilters, 
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return { success: false, error: error?.response?.data || error.message };
  }
};

