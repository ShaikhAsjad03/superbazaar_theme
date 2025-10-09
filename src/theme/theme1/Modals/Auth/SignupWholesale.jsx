"use client";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { createClientAxios } from "@/services/apiClient";
import { signIn, useSession } from "next-auth/react";
import Select from "react-select";
import { COUNTRIES } from "@/data/countrylists";
import { signupWholesaleSchema } from "@/schema/schema";

export default function SignupWholesaleModal() {
  const { data: session } = useSession();
  const { modal, close, open } = useModal();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",       
    businessDetail: "",
    GSTNumber: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupWholesaleSchema,
    onSubmit: async (values) => {
      try {
        const axiosInstance = createClientAxios();
        const response = await axiosInstance.post("auth/wholesale-register", values);
        if (response.status == 200) {
          close("signupwholesale");
          setErrors(null);
          const loginRes = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (loginRes?.error) {
            setErrors(loginRes?.error || "Something went wrong");
          } else {
            const session = await fetch("/api/auth/session").then((r) => r.json());
            if (session?.accessToken) {
              localStorage.setItem("token", session.accessToken);
            }
            close("signupwholesale");
          }
        }
      } catch (err) {
        setErrors(err?.response?.data?.message || "Something went wrong");
        return err;
      }
    },
  });

  useEffect(() => {
    if (!modal.signupwholesale) {
      setErrors(null);
      formik.resetForm();
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [modal.signupwholesale]);

  if (!modal.signupwholesale) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
        onClick={() => close("signupwholesale")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-3xl 
               p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("signupwholesale")}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Wholesale Sign Up</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label
                className="absolute left-3 text-gray-400 text-sm transition-all
                           peer-placeholder-shown:top-4
                           peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1"
              >
                Name
              </label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Email
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>
          </div>

          {/* Password + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Mobile + Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="mobile_number"
                value={formik.values.mobile_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Mobile Number
              </label>
              {formik.touched.mobile_number && formik.errors.mobile_number && (
                <p className="text-xs text-red-500">{formik.errors.mobile_number}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Select
                name="country"
                placeholder="Select Country"
                options={COUNTRIES}
                value={COUNTRIES.find((c) => c.value === formik.values.country)}
                onChange={(option) => formik.setFieldValue("country", option.value)}
                onBlur={formik.handleBlur}
                styles={{
                  control: (base) => ({ ...base, minHeight: 42, height: 42 }),
                  valueContainer: (base) => ({ ...base, height: 42, padding: "0 8px" }),
                  input: (base) => ({ ...base, margin: 0, padding: 0 }),
                  indicatorsContainer: (base) => ({ ...base, height: 42 }),
                }}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-xs text-red-500">{formik.errors.country}</p>
              )}
            </div>
          </div>

          {/* State + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                State
              </label>
              {formik.touched.state && formik.errors.state && (
                <p className="text-xs text-red-500">{formik.errors.state}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                City
              </label>
              {formik.touched.city && formik.errors.city && (
                <p className="text-xs text-red-500">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* Pincode + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Pincode
              </label>
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="text-xs text-red-500">{formik.errors.pincode}</p>
              )}
            </div>

            {/* ✅ Address field added */}
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              />
              <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
                Address
              </label>
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-red-500">{formik.errors.address}</p>
              )}
            </div>
          </div>

          {/* GST Number */}
          <div className="relative">
            <input
              type="text"
              name="GSTNumber"
              value={formik.values.GSTNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
            />
            <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
              GST Number
            </label>
            {formik.touched.GSTNumber && formik.errors.GSTNumber && (
              <p className="text-xs text-red-500">{formik.errors.GSTNumber}</p>
            )}
          </div>

          {/* Business Details */}
          <div className="relative">
            <textarea
              name="businessDetail"
              value={formik.values.businessDetail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm"
              rows={3}
            />
            <label className="absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-500 bg-white px-1">
              Business Detail
            </label>
            {formik.touched.businessDetail && formik.errors.businessDetail && (
              <p className="text-xs text-red-500">{formik.errors.businessDetail}</p>
            )}
          </div>

          {/* Submit + Login */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full sm:w-auto flex-1 py-2 rounded-sm transition-colors duration-200 flex items-center justify-center gap-2
      ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-950 text-white hover:bg-zinc-700"}`}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            {!session?.accessToken && (
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    close("signupwholesale");
                    open("login");
                  }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
          {errors && <p className="text-red-400 text-sm">{errors}</p>}
        </form>
      </div>
    </div>
  );
}
