"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ResetPasswordschema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import { useRouter } from "next/navigation";
import Breadcrum from "../components/BreadCrums/Breadcrum";

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: { password: "", confirmPassword: "" },
        validationSchema: ResetPasswordschema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const axiosInstance = createClientAxios();
                const payload = {
                    password: values.password,
                    secret: typeof window !== "undefined" ? localStorage.getItem("otpsecrets") : "",
                    otp: typeof window !== "undefined" ? localStorage.getItem("otp") : "",
                    email: typeof window !== "undefined" ? localStorage.getItem("email") : "",
                };

                const response = await axiosInstance.post("auth/reset-password", payload);

                if (response.data.isSuccess) {
                    localStorage.removeItem("email");
                    localStorage.removeItem("otpsecrets");
                    localStorage.removeItem("otp");
                    router.push("/login");
                }
            } catch (error) {
                setErrors(error.response?.data?.message || "Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <Breadcrum name=" Reset Password" />
            <div className="h-[450px] flex items-center justify-center bg-gray-50 mb-8">
                <div className="container mx-auto px-4">
                    <div className=" gap-8 items-center max-w-1/3 mx-auto">
                        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                                Reset Password
                            </h2>
                            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                <div className="w-full">
                                    <div className="relative flex items-center">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="New Password"
                                            {...formik.getFieldProps("password")}
                                            className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.password && formik.errors.password
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-gray-500"
                                                }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 flex items-center justify-center h-full"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {formik.touched.password && formik.errors.password && (
                                        <span className="text-red-500 text-xs mt-1 block text-start">
                                            {formik.errors.password}
                                        </span>
                                    )}
                                </div>

                                <div className="w-full">
                                    <div className="relative flex items-center">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            {...formik.getFieldProps("confirmPassword")}
                                            className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-gray-500"
                                                }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 flex items-center justify-center h-full"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <span className="text-red-500 text-xs mt-1 block text-start">
                                            {formik.errors.confirmPassword}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-sm transition-colors duration-200 ${formik.isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-zinc-950 text-white hover:bg-zinc-700"
                                        }`}
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

                                {errors && <p className="text-red-400 text-sm text-center">{errors}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
