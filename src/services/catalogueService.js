import { createClientAxios, createServerAxios } from "./apiClient";

export const getCataloguedetail = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/catalogue-detail/${url}`);

    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getCatalogueStitching = async (url) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/catalogue-stitching/${url}`);
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};
export const getRelatedCatalogue = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/catalogue-related/${url}`);
    return res.data;
  } catch (error) {
     return { success: false, error: error?.response?.data || error.message };
  }
};
export const getAllCatalogue = async (page, category, perPage = 20, sortOption) => {
  try {
    const url = `/public/wholesale?page=${page}&perPage=20${category}&sortOption=${sortOption}`
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(url);

    return res.data;
  } catch (error) {
     return { success: false, error: error?.response?.data || error.message };
  }
};


export const getCategory = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/category`);
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};

