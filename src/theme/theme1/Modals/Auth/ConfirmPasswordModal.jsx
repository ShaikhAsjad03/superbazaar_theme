"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ResetPasswordschema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";

export default function ConfirmPasswordModal() {
  const { modal, close, open } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(null)



  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: ResetPasswordschema,
    onSubmit: async (values) => {
      try {
        const axiosInstance = createClientAxios();
        const payload = {
          password: values.password,
          secret: localStorage.getItem("otpsecrets"),
          otp: localStorage.getItem("otp"),
          email: localStorage.getItem("email")
        }
        const response = await axiosInstance.post("auth/reset-password", payload)
        if (response.data.isSuccess) {
          localStorage.removeItem("email")
          localStorage.removeItem("otpsecrets")
          localStorage.removeItem("otp")
          close("confirmPassword");
          open("login")
        }
      } catch (error) {
        setErrors(error.response?.data?.message)
        return error
      }
    },
  });

  useEffect(() => {
    if (!modal.confirmPassword) formik.resetForm();
  }, [modal.confirmPassword]);

  if (!modal.confirmPassword) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => close("confirmPassword")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-md p-8 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("confirmPassword")}
        >
          ✕
        </button>

        <h2 className="text-2xl font-normal mb-6 text-left">Reset Password</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="password"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              New Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-zinc-900 text-white py-2 rounded-sm hover:bg-black transition-colors duration-200
       ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-950 text-white hover:bg-zinc-700"}`}
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
          {errors && <p className="text-red-400 text-sm">{errors}</p>}
        </form>
      </div>
    </div>
  );
}
