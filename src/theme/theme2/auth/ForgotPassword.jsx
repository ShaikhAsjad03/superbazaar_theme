"use client";

import { forgetSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import { useFormik } from "formik";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Breadcrum from "../components/BreadCrums/Breadcrum";
import Link from "next/link";

export default function ForgotPassword() {
    const [errors, setErrors] = useState(null);
    const router = useRouter();
    const initialValues = { email: "" };

    const formik = useFormik({
        initialValues,
        validationSchema: forgetSchema,
        onSubmit: async (values) => {
            try {
                const axiosInstance = createClientAxios();
                const response = await axiosInstance.post("auth/otp", values);

                if (response.data.status == 200) {
                    localStorage.setItem("otpsecrets", response?.data?.secret);
                    localStorage.setItem("email", values.email);

                    router.push("/otp");
                }
            } catch (error) {
                setErrors(error.response?.data?.message || "Something went wrong");
                return error;
            }
        },
    });

    return (
        <>
            <Breadcrum name="Forgot password" />
            <div className="h-[450px] flex items-center justify-center bg-gray-50 mb-8">
                <div className="container mx-auto px-4">
                    <div className=" gap-8 items-center max-w-1/3 mx-auto">
                        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                                Forgot Password
                            </h2>

                            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder=" "
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 ocus:ring-gray-500"
                                            }`}
                                    />

                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {formik.errors.email}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-sm transition-colors duration-200 ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-zinc-950 text-white hover:bg-zinc-700"}`}
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>

                                {errors && (
                                    <p className="text-red-400 text-sm text-center">{errors}</p>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <Link
                                        href="/login"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Back To Login
                                    </Link>
                                </div>
                            </form >
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
