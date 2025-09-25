
"use client";

import { SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { profileschema } from "@/schema/schema";
import { updateUserInfo } from "@/services/accountsService";

export default function AccountDetailTheme2({ data }) {
    const [userData, setUserData] = useState(data);

    useEffect(() => {
        setUserData(data);
    }, [data]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const { email, ...other } = values;
            const response = await updateUserInfo(data.id, other);
            if (response.isSuccess) {
                setUserData(values);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Account Details</h2>
            </div>

            <Formik
                enableReinitialize
                initialValues={{
                    name: userData?.name || "",
                    email: userData?.email || "",
                    mobile_number: userData?.mobile_number || "",
                }}
                validationSchema={profileschema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full max-w-2xl p-6 rounded-xl bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder=" "
                                    className="peer w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-zinc-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            <div className="relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    className="peer w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-zinc-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>

                            <div className="relative sm:col-span-2">
                                <Field
                                    type="text"
                                    name="mobile_number"
                                    placeholder=" "
                                    className="peer w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-zinc-500"
                                />
                                <ErrorMessage
                                    name="mobile_number"
                                    component="p"
                                    className="text-xs text-red-500 mt-1"
                                />
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                                <Field
                                    id="newsletter"
                                    name="newsletter"
                                    type="checkbox"
                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
                                />
                                <label htmlFor="newsletter" className="text-sm text-gray-700">
                                    Sign up for our newsletter
                                </label>
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 w-25 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
}

