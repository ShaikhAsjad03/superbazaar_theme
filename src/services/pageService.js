import { createClientAxios } from "./apiClient";

export const getPageContent = async (category) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/page/${category}`);
    return res.data?.data || {};
  } catch (error) {
     return { success: false, error: error?.response?.data || error.message };
  }
};