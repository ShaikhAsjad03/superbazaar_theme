import  { createClientAxios } from "./apiClient";
export const addToCartProduct = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.post(`/cart`,values);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const getCartItems=async(id)=>{
  try{
   
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.get(`/cart/${id}`,);  
    return res.data
  }catch(error){
    return error.response?.data?.message
  }
}
export const putCartProduct = async (values) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.put(`/cart/${values?.cartItem_id}`,{quantity:values.quantity});
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const deleteCartProduct = async (id) => {
  try {
    const axiosInstance = await createClientAxios();
    const res = await axiosInstance.delete(`/cart/${id}`,);
    return res.data || {};
  } catch (error) {
    return error;
  }
};
export const updateCartQuantity = async (item, newQty,userId) => {
  try {
    const finalCartData = {
      cartItem_id: item.id,
      quantity: newQty,
    };
    await putCartProduct(finalCartData);
    const freshCart = await getCartItems(userId);
    return freshCart; 
  } catch (err) {
    return err;
  }
};