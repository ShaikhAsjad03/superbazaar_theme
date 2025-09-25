"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { createClientAxios } from "@/services/apiClient";

const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    mobile_number: Yup.string().required("Mobile number is required"),
});

export default function Signup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile_number: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const axiosInstance = createClientAxios();
                const response = await axiosInstance.post("/auth/register", values);

                if (response.status === 200) {
                    setErrors(null);

                    const loginRes = await signIn("credentials", {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                    });

                    if (loginRes?.error) {
                        setErrors("Login failed after signup");
                    } else {
                        router.push("/");
                    }
                }
            } catch (error) {
                setErrors(error?.response?.data?.message || "Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="bg-white w-full max-w-md p-8 border border-gray-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            {...formik.getFieldProps("name")}
                            className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.name && formik.errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-gray-500"
                                }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.name}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 ocus:ring-gray-500"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="Password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                                className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.password && formik.errors.password ? "border-red-500 focus:ring-red-400"
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
                                className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500 focus:ring-red-400"
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

                    <div className="relative mt-2">
                        <input
                            type="text"
                            name="mobile_number"
                            placeholder="Mobile Number"
                            {...formik.getFieldProps("mobile_number")}
                            className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.mobile_number && formik.errors.mobile_number ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-gray-500"
                                }`}
                        />
                        {formik.touched.mobile_number && formik.errors.mobile_number && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.mobile_number}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${formik.isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-red-700 text-white"
                            }`}
                    >
                        {formik.isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    {errors && (
                        <p className="text-red-500 text-sm text-center">{errors}</p>
                    )}

                    <p className="text-sm text-center mt-2 text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

