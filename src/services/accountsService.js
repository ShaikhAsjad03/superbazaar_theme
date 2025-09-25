import { signOut } from "next-auth/react";
import { createClientAxios, createServerAxios } from "./apiClient";
export const getUserInfo = async (id) => {
  try {
    const axiosInstance = await createServerAxios();
    const res = await axiosInstance.get(`/users/profile/${id}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const updateUserInfo = async (id, values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.put(`/users/${id}`, values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getUserAddress = async (id) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/users/address/${id}`);
    return res.data?.data || {};
  } catch (error) {
    return error;
  }
};
export const postuserAddress = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/users/address`, values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const deleteUserAddress = async (id) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.delete(`/user/address/${id}`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const postuserOrderHistory = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/orders/pagination`, values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getUserWishlist = async () => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/wishlist`);
    return res.data || [];
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await signOut({ redirect: false });
  localStorage.removeItem("token");
}    return error;
  }
};
export const postUserWishlist = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/wishlist`, values);
    return res.data || [];
  } catch (error) {
    return error;
  }
}
export const getOrderDetails = async (id) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/orders/details/${id}`);
    return res.data || {};
  } catch (error) {
    return error;
  }
};