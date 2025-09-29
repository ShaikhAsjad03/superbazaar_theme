import axios from "axios";
import { createServerAxios } from "./apiClient";

export const getMenu = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/menu`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};


export const getCurrency = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/currency`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};


export const getTheme = async () => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/public/theme`);
    return res.data?.data || {};
  } catch (error) {
    const data = {name: "", config: {}}
    return data;
  }
};