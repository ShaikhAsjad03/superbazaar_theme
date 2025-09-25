"use client";

import { useState, useRef, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { otpSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";


export default function ForgetPasswordModal() {
  const { modal, close, open } = useModal();
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState(null)
  const inputsRef = useRef([]);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const axiosInstance = createClientAxios();
        values.secret = localStorage.getItem("otpsecrets");
        const response = await axiosInstance.post("auth/verify-otp", values)
        if (response.data.isSuccess) {
          const expiryTime = Date.now() + 4 * 60 * 1000;
          localStorage.setItem("otp", values.otp)
          localStorage.setItem("otp_expiry", expiryTime);
          await close("otp")
          open("confirmPassword")
        }
      } catch (error) {
        setErrors(error.response?.data?.message)
        return error
      }

    },
  });

  useEffect(() => {
    formik.setFieldValue("otp", otpArray.join(""));
  }, [otpArray]);
  useEffect(() => {
    if (!modal.otp) {
      setOtpArray(["", "", "", "", "", ""]);
      formik.resetForm();
    }
  }, [modal.otp]);

  if (!modal.otp) return null;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      const newOtp = [...otpArray];
      newOtp[index - 1] = "";
      setOtpArray(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => close("otp")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-md p-8 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("otp")}
        >
          ✕
        </button>

        <h2 className="text-2xl font-normal mb-6 text-left">Enter OTP</h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between gap-2">
            {otpArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-12 border rounded text-center text-lg focus:outline-none ${formik.errors.otp && formik.touched.otp
                  ? "border-red-500"
                  : "border-gray-300 focus:border-zinc-500"
                  }`}
              />
            ))}
          </div>

          {formik.errors.otp && formik.touched.otp && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.otp}</p>
          )}

          <p className="text-sm text-gray-600 text-center sm:text-left cursor-pointer">
            <button
              type="button"
              onClick={() => {
                close("otp");
                open("login");
              }}
              className="text-zinc-900 font-medium underline hover:text-red-600 flex items-center gap-1"
            >
              Back To Login <ArrowUpRight size={14} />
            </button>
          </p>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-zinc-900 text-white py-2 rounded-sm hover:bg-black transition-colors duration-200
               ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-950 text-white hover:bg-zinc-700"}
              `}>
            {formik.isSubmitting ? (
              <>
                <Loader2 className=" animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              " Verify OTP"
            )}
          </button>
          {errors && <p className="text-red-400 text-sm">{errors}</p>}
        </form>
      </div>
    </div>
  );
}
