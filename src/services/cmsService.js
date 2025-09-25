import { createClientAxios } from "./apiClient";

export const getPolicies = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/cms`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getPoliciesDetail = async (url) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/cms/${url}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

export const getSocialIcon = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/socialmedia`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};
