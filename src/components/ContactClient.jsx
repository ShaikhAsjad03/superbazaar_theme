"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
} from "lucide-react";
import { ContactSchema } from "@/schema/schema";
import { useFormik } from "formik";
import axios from "axios";
import Breadcrum from "@/theme/theme2/components/BreadCrums/Breadcrum";

export default function ContactClient({ webSetting }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile_number: "",
            subject: "",
            message: "",
        },
        validationSchema: ContactSchema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}api/public/contact-us`,
                    values,
                    { headers: { "Content-Type": "application/json" } }
                );
                if (response?.data?.message) {
                    resetForm();
                    router.push("/");
                } else {
                }
            } catch (error) {
                console.error("Error in contact form:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = formik;

    return (
        <div id="page-content" className="contactus-page">

            <Breadcrum name="Contact us" />

            <div className="container mx-auto px-4 py-10">
                <div className="w-full mb-10">
                    <div className="w-full h-[450px] rounded-lg shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.510349!2d72.8338928!3d21.1843624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6a2dfb24c5%3A0x3c0399aa6565be8!2s2nd%20Floor%2C%20D%20House%2C%2021st%20Century%20Building%20Above%20HDFC%20Bank%2C%20Ring%20Rd%2C%20near%20WTC%2C%20Udhana%20Darwaja%2C%20Surat%2C%20Gujarat%20395002!5e0!3m2!1sen!2sin!4v1690123456789!5m2!1sen!2sin"

                            // src={webSetting?.mapUrl}
                            allowFullScreen
                            loading="lazy"
                            className="w-full h-full border-0"
                            title="Google Maps Location"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 shadow rounded-lg">
                        <h2 className="text-center text-2xl font-semibold mb-6 pb-2">
                            Get in Touch
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <strong className="flex items-center mb-1 text-gray-700">
                                    <MapPin className="w-5 h-5 mr-2 text-gray-900" /> Address
                                </strong>
                                <p className="text-gray-900 whitespace-pre-line">
                                    {webSetting?.address}
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <MessageCircle className="w-5 h-5 mr-2  text-gray-900" /> International
                                    </strong>
                                    <Link
                                        href={`tel:${webSetting?.interNationalNumber || ""}`}
                                        className=" text-gray-900 hover:underline"
                                    >
                                        {webSetting?.interNationalNumber}
                                    </Link>
                                </li>

                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <MessageCircle className="w-5 h-5 mr-2  text-gray-900" /> Domestic
                                    </strong>
                                    <Link
                                        href={`https://wa.me/${webSetting?.domesticNumber || ""}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" text-gray-900 hover:underline"
                                    >
                                        {webSetting?.domesticNumber}
                                    </Link>
                                </li>

                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <Phone className="w-5 h-5 mr-2  text-gray-900" /> For Complaint
                                    </strong>
                                    <Link
                                        href={`https://wa.me/${webSetting?.complaintNumber || ""}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" text-gray-900 hover:underline"
                                    >
                                        {webSetting?.complaintNumber}
                                    </Link>
                                </li>

                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <Mail className="w-5 h-5 mr-2  text-gray-900" /> Email
                                    </strong>
                                    <Link
                                        href={`mailto:${webSetting?.email || ""}`}
                                        className=" text-gray-900 hover:underline"
                                    >
                                        {webSetting?.email}
                                    </Link>
                                </li>

                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <MessageCircle className="w-5 h-5 mr-2  text-gray-900" /> Skype
                                    </strong>
                                    <Link
                                        href={`skype:${webSetting?.skypeId || ""}?chat`}
                                        className=" text-gray-900 hover:underline"
                                    >
                                        {webSetting?.skypeId}
                                    </Link>
                                </li>

                                <li>
                                    <strong className="flex items-center mb-1 text-gray-700">
                                        <Clock className="w-5 h-5 mr-2  text-gray-900" /> Timing
                                    </strong>
                                    <p className="text-gray-900">{webSetting?.timing}</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-center text-2xl font-semibold mb-6">
                            Drop Us A Line
                        </h2>

                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your name"
                                        {...formik.getFieldProps("name")}
                                        className={`w-full border rounded px-4 py-2.5 text-sm shadow-sm focus:outline-none ${touched.name && errors.name
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-500"
                                            }`}
                                    />
                                    {touched.name && errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email Address"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full border rounded px-4 py-2.5 text-sm shadow-sm focus:outline-none ${touched.email && errors.email
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-500"
                                            }`}
                                    />
                                    {touched.email && errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        placeholder="Your mobile number"
                                        value={values.mobile_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full border rounded px-4 py-2.5 text-sm shadow-sm focus:outline-none ${touched.mobile_number && errors.mobile_number
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-500"
                                            }`}
                                    />
                                    {touched.mobile_number && errors.mobile_number && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.mobile_number}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Your subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full border rounded px-4 py-2.5 text-sm shadow-sm focus:outline-none ${touched.subject && errors.subject
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-500"
                                            }`}
                                    />
                                    {touched.subject && errors.subject && (
                                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Your message"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full border rounded px-4 py-2.5 text-sm shadow-sm focus:outline-none ${touched.message && errors.message
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                />
                                {touched.message && errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition flex justify-center items-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
