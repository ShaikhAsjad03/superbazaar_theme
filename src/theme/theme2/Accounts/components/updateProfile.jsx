"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import { profileschema } from "@/schema/schema";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "@/services/accountsService";
const UpdateProfile = ({ open, onClose, user, onUpdate, userId }) => {
    const router = useRouter()
    const initialValues = {

        name: user?.name || "",
        mobile_number: user?.mobile_number || "",
        email: user?.email || "",
    };
    const { errors, values, handleBlur, handleChange, handleSubmit, isSubmitting, touched, setFieldValue } = useFormik({
        initialValues,
        validationSchema: profileschema,
        onSubmit: async (values) => {
            try {
                const { email, ...other } = values
                const response = await updateUserInfo(userId, other)
                if (response.isSuccess) {
                    if (onUpdate) onUpdate(values);
                    onClose();
                }

            } catch (errors) {

                return errors
            }

        }
    })
    useEffect(() => {
        if (user?.email) {
            setFieldValue("email", user?.email)
            setFieldValue("name", user?.name)
            setFieldValue("mobile_number", user?.mobile_number)


        }
    }, [user])

    return (
        <div
            className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}>
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
                    <h2 className="text-lg font-semibold">Update Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-center  w-full h-screen">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 w-full max-w-md  p-6 rounded-xl mt-15">
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                className="peer w-full border border-gray-300 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
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
                                Full Name
                            </label>
                            {touched.name && errors.name && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                className="peer w-full border border-gray-300 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
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
                                Email
                            </label>
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.email}
                                </p>
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
                                className="peer w-full border border-gray-300 rounded-lg px-5 pt-5 pb-5 text-sm focus:outline-none focus:border-zinc-500"
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
                                Mobile Number
                            </label>
                            {touched.mobile_number && errors.mobile_number && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.mobile_number}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 mt-5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default UpdateProfile