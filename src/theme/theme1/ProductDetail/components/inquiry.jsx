"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import { updateUserInfo } from "@/services/accountsService";
import { inquirySchema } from "@/schema/schema";
import { postInquiry } from "@/services/inquiry";

const InquiryForm = ({ open, onClose, product_id, catalogue_id }) => {
    const initialValues = {
        email: "",
        mobile_number: "",
        description: "",
    };

    const {
        errors,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema: inquirySchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    ...(catalogue_id ? { catalogue_id } : { product_id }),
                };

                const response = await postInquiry(payload);

                if (response.isSuccess) {
                    onClose();
                }
            } catch (error) {
                console.error(error);
                return error;
            }
        }

    });

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
             resetForm();
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open, resetForm]);

    return (
        <div
            className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"
                }`}
        >
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            <div
                className={`absolute right-0 top-0 h-full w-[600px] rounded-l-2xl bg-white shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Inquiry Form</h2>
                    <button
                        onClick={onClose}
                        className="transition-colors text-zinc-900 hover:text-white hover:bg-zinc-900 p-2 rounded-md"
                    >

                        <X
                            size={18}
                        />
                    </button>
                </div>

                <div className="flex justify-center w-full h-screen">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 w-full max-w-md p-6 rounded-xl mt-15"
                    >
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                className="peer w-full border border-zinc-800 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-3 text-zinc-400 text-sm transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-zinc-400
                  peer-placeholder-shown:text-sm
                  peer-focus:top-0
                  peer-focus:text-zinc-500
                  peer-focus:text-xs
                  bg-white px-1"
                            >
                                Email
                            </label>
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                id="mobile"
                                name="mobile_number"
                                value={values.mobile_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                className="peer w-full border border-zinc-800 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            <label
                                htmlFor="mobile"
                                className="absolute left-3 text-zinc-400 text-sm transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-zinc-400
                  peer-placeholder-shown:text-sm
                  peer-focus:top-0
                  peer-focus:text-zinc-500
                  peer-focus:text-xs
                  bg-white px-1"
                            >
                                Mobile Number
                            </label>
                            {touched.mobile_number && errors.mobile_number && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.mobile_number}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                rows="4"
                                className="peer w-full border border-zinc-800 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            <label
                                htmlFor="description"
                                className="absolute left-3 text-zinc-400 text-sm transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-zinc-400
                  peer-placeholder-shown:text-sm
                  peer-focus:top-0
                  peer-focus:text-zinc-500
                  peer-focus:text-xs
                  bg-white px-1"
                            >
                                Description
                            </label>
                            {touched.description && errors.description && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 mt-5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryForm;
