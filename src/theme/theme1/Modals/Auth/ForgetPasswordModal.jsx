"use client";

import { useModal } from "@/hooks/useModal";
import { forgetSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import { useFormik } from "formik";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ForgetPasswordModal() {
  const { modal, close, open } = useModal();
  const [errors, setErrors] = useState(null)
  const initialValues = { email: "" };

  const formik = useFormik({
    initialValues,
    validationSchema: forgetSchema,
    onSubmit: async (values) => {
      try {
        const axiosInstance = createClientAxios();
        const response = await axiosInstance.post("auth/otp", values)
        if (response.data.status == 200) {
          localStorage.setItem("otpsecrets", response?.data?.secret)
          localStorage.setItem("email", values.email)
          open("otp")
          close("forget")
        }
      } catch (error) {
        setErrors(error.response?.data?.message)
        return error
      }
    },
  });

  useEffect(() => {
    if (!modal.forget) {
      formik.resetForm();
    }
  }, [modal.forget]);

  if (!modal.forget) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => close("forget")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-md p-8 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("forget")}>
          ✕
        </button>

        <h2 className="text-2xl font-normal mb-6 text-left">Forget Password</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="email"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Email
            </label>

            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>


          <p className="text-sm text-gray-600 text-center sm:text-left cursor-pointer">
            <button
              type="button"
              onClick={() => { close("forget"); open("login"); }}
              className="text-zinc-900 font-medium underline hover:text-red-600 flex items-center gap-1"
            >
              Back To Login <ArrowUpRight size={14} />
            </button>
          </p>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-zinc-900 text-white py-2 rounded-sm hover:bg-black transition-colors duration-200
                              ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-950 text-white hover:bg-zinc-700"}`}>
            {formik.isSubmitting ? (
              <>
                <Loader2 className=" animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              "Send OTP"
            )}
          </button>
          {errors && <p className="text-red-400 text-sm">{errors}</p>}
        </form>
      </div>
    </div>
  );
}
