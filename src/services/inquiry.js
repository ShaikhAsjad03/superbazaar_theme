import { createClientAxios } from "./apiClient";
export const postInquiry = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/public/inquiry`, values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};