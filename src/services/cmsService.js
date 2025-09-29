import { createClientAxios } from "./apiClient";

export const getPolicies = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/cms`);
    return res.data;
  } catch (error) {
    return { success: false, error: error?.response?.data || error.message };
  }
};

export const getPoliciesDetail = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/cms/${url}`);
    return res.data;
  } catch (error) {
     return { success: false, error: error?.response?.data || error.message };
  }
};

export const getSocialIcon = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/socialmedia`);
    return res.data;
  } catch (error) {
     return { success: false, error: error?.response?.data || error.message };
  }
};
