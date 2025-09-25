import { createClientAxios } from "./apiClient";
export const newsLetter = async (values) => {
    try {
        const axiosInstance = await createClientAxios();
        const res = await axiosInstance.post(`/public/newsletter`, values);
        return res.data || {};
    } catch (error) {
        return error;
    }
};