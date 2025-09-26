"use client";

import { ImageUrl } from "@/helper/imageUrl";
import { bankPaymentSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import axios from "axios";
import { useFormik } from "formik";
import { UploadCloud, Loader2 } from "lucide-react";
import { useState } from "react";

const BankPayment = ({ orderId, cb }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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
      setLoading(true);
      setApiError("");
      try {
        const axiosInstance = createClientAxios();
        const response = await axiosInstance.put(`/orders/payment/${orderId}`, values);

        if (response.status === 200) {
          cb?.();
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      } catch (err) {
        setApiError(err?.response?.data?.message || "Payment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = async (file) => {
    try {
      const formdata = new FormData();
      formdata.append("image", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CDN_URL}api/uploads?label=bankReceipt`,
        formdata
      );

      if (response.status === 200) {
        const { path } = response.data;
        setFieldValue("receiptImage", path);
        setPreview(path);
      } else {
        setApiError("Image upload failed.");
      }
    } catch (err) {
      setApiError("Image upload failed.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleFileInput = (e) => {
    const file = e.currentTarget.files?.[0];
    if (file) handleImageChange(file);
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-zinc-700">
        Your payment is still pending. Please complete payment below:
      </p>

      {apiError && (
        <div className="bg-red-100 text-red-700 p-2 rounded mt-2 text-sm">
          {apiError}
        </div>
      )}

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
            className="border rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />
          {touched.transactionId && errors.transactionId && (
            <p className="text-red-400 text-sm">{errors.transactionId}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="receiptImage"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer bg-gray-100 overflow-hidden hover:border-zinc-950 transition"
          >
            {preview ? (
              <img
                src={ImageUrl(preview)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <UploadCloud className="w-10 h-10 mb-2 text-zinc-900" />
                <p className="text-sm text-zinc-900 mb-1">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-zinc-900">PNG, JPG, or GIF (max 800x400px)</p>
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
            <p className="text-red-400 text-sm">{errors.receiptImage}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-zinc-950 text-white py-2 hover:bg-transparent hover:text-zinc-950 border border-zinc-950 transition rounded ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          <span>{loading ? "Processing..." : "Pay Now"}</span>
        </button>
      </form>
    </div>
  );
};

export default BankPayment;
