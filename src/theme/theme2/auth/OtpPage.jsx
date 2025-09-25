"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { otpSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import { useRouter } from "next/navigation";
import Breadcrum from "../components/BreadCrums/Breadcrum";
import Link from "next/link";

export default function OtpPage() {
    const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
    const [errors, setErrors] = useState(null);
    const inputsRef = useRef([]);
    const router = useRouter();

    const formik = useFormik({
        initialValues: { otp: "" },
        validationSchema: otpSchema,
        onSubmit: async (values) => {
            try {
                const axiosInstance = createClientAxios();
                values.secret = localStorage.getItem("otpsecrets");

                const response = await axiosInstance.post("auth/verify-otp", values);

                if (response.data.isSuccess) {
                    const expiryTime = Date.now() + 4 * 60 * 1000;
                    localStorage.setItem("otp", values.otp);
                    localStorage.setItem("otp_expiry", expiryTime);

                    router.push("/confirm-password");
                }
            } catch (error) {
                setErrors(error.response?.data?.message || "Something went wrong");
                return error;
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue("otp", otpArray.join(""));
    }, [otpArray]);

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
        <>
            <Breadcrum name="OTP" />
            <div className="h-[450px] flex items-center justify-center bg-gray-50 mb-8">
                <div className="container mx-auto px-4">
                    <div className=" gap-8 items-center max-w-1/3 mx-auto">
                        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                                Enter OTP
                            </h2>

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
                                        "Verify OTP"
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
