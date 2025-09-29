import { createClientAxios } from "./apiClient";

export const getsearchData = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/search?${url}`);
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};
