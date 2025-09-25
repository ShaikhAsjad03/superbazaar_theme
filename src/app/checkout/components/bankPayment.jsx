"use client";
import { ImageUrl } from "@/helper/imageUrl";
import { bankPaymentSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import axios from "axios";
import { useFormik } from "formik";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

const BankPayment = ({ orderId }) => {
  const [preview, setPreview] = useState(null);

  const initialValues = {
    transactionId: "",
    receiptImage: null,
  };

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: bankPaymentSchema,
    onSubmit: async (values) => {
      try {
        const axiosInstance = createClientAxios()
        const response = await axiosInstance.put(`/orders/payment/${orderId}`, values)
      } catch (errors) {
        return errors
      }
    },
  });

  const handleImageChange = async (file) => {
    try {
      const formdata = new FormData()
      formdata.append("image", file)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_CDN_URL}api/uploads?label=bankReceipt`, formdata)
      if (response.status == 200) {
        const { path, message } = response.data;
        setFieldValue("receiptImage", path);
        setPreview(path);
      }

    } catch (errors) {
      return errors
    }

  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-zinc-700">
        Your payment is still pending. Please complete payment below:
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={values.transactionId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter transaction id"
            className="border rounded px-3 py-3 text-sm"
          />
          {touched.transactionId && errors.transactionId && (
            <p className="text-red-400">{errors.transactionId}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="receiptImage"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer bg-gray-100 overflow-hidden"
          >
            {preview ? (
              <img
                src={ImageUrl(preview)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <UploadCloud className="w-10 h-10 mb-3 text-zinc-900" />
                <p className="mb-1 text-sm text-zinc-900">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-zinc-900">
                  PNG, JPG, or GIF (max 800x400px)
                </p>
              </>
            )}

            <input
              id="receiptImage"
              name="receiptImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
              onBlur={handleBlur}
            />
          </label>

          {touched.receiptImage && errors.receiptImage && (
            <p className="text-red-400">{errors.receiptImage}</p>
          )}
        </div>


        <button
          type="submit"
          className="bg-zinc-950 text-white py-2 hover:bg-transparent hover:text-zinc-950 border border-zinc-950 transition rounded"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default BankPayment;
