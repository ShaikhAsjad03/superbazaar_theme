import  { createClientAxios } from "./apiClient";
export const getPyamentMethod = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/payment`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getShippingMethod = async (query) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/public/shippingmethod?${query}`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};

export const postOrder = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/orders`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};


export const postCCAvenueOrder = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/orders/cc-avenue`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};

