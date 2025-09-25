"use client"
import React, { useState } from 'react'
import StitchingForm from './StitchingForm'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFormik } from 'formik';
import { inquirySchema } from '@/schema/schema';
import { postInquiry } from '@/services/inquiry';

const ProductAccordion = ({ product, Stitching, setStitchingData, attributes, type, catalogUrl }) => {
    const [open, setOpen] = useState("stitching");
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const category = parts[1];
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
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema: inquirySchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    ...(type === "catalogue"
                        ? { catalogue_id: product?.id }
                        : { product_id: product?.id }),
                };

                const response = await postInquiry(payload);

            } catch (error) {
                console.error(error);
                return error;
            }
        }

    });


    const toggle = (section) => {
        setOpen(open === section ? null : section);
    };

    return (
        <div>
            {product.optionType === "Stitching" &&
                <div className='border-b border-gray-200'>
                    <button
                        onClick={() => toggle("stitching")}
                        className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
      ${open === "stitching" ? "text-blue-600" : "text-gray-800"}`}
                    >
                        Stitching
                        <span className="text-xl">{open === "stitching" ? "−" : "+"}</span>
                    </button>
                    {open === "stitching" && (
                        <div className="px-4 pb-4 mt-2 text-sm">
                            <StitchingForm stitchingData={Stitching || {}} onChange={setStitchingData} />
                        </div>
                    )}
                </div>}

            <div className='border-b border-gray-200'>
                <button
                    onClick={() => toggle("details")}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold ${open === "details" ? "text-blue-600" : "text-gray-800"}`}
                >
                    Product Details
                    <span className="text-xl">{open === "details" ? "−" : "+"}</span>
                </button>
                <div>

                    {open === "details" && (
                        <div className="px-4 pb-4 text-sm mt-4 ">
                            <table className="w-full border border-gray-200">
                                <tbody>
                                    {attributes?.attributeValues?.map((attr, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                    }`}
                                            >
                                                <td className="font-semibold w-1/3 px-3 py-2">{attr.name}</td>
                                                <td className="px-3 py-2">
                                                    {attr.key === "color" ? (
                                                        <div className="flex gap-2 flex-wrap">
                                                            {attr.values?.map((val, i) => (
                                                                <div key={i} className="flex items-center gap-2">
                                                                    <span
                                                                        className="inline-block w-5 h-5 rounded-full border border-gray-300"
                                                                        style={{ backgroundColor: val.color }}
                                                                    ></span>
                                                                    <span>{val.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (attr.values?.map((val) => (Array.isArray(val) ? val.join(", ") : val)).join(", "))}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {type !== "catalogue" && <p className="mt-3 text-sm">
                                <span className="font-semibold">Catalog: </span>
                                <Link href={`/catalogue/${category}/${catalogUrl}`} className="text-blue-600 underline">
                                    View Full Catalog
                                </Link>
                            </p>}
                            {type === "catalogue" && (
                                <div className="mt-3 text-sm flex items-center gap-1">
                                    <span className="font-semibold">Pcs :</span>
                                    <span className="text-gray-700 leading-relaxed">
                                        {product.no_of_product} Items
                                    </span>
                                </div>
                            )}

                            <p className="mt-3 text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}
                </div>

            </div>

            <div>
                <button
                    onClick={() => toggle("enquiry")}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold ${open === "enquiry" ? "text-blue-600 " : "text-gray-800"}`}
                >
                    Enquiry
                    <span className="text-xl">{open === "enquiry" ? "−" : "+"}</span>
                </button>

                {open === "enquiry" && (
                    <div className="px-4 pb-4 text-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <div className="">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email"
                                            className="w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 border-gray-300 focus:ring-gray-500"
                                        />
                                    </div>
                                    {touched.email && errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="">
                                        <input
                                            type="number"
                                            id="mobile"
                                            name="mobile_number"
                                            value={values.mobile_number}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your mobile number"
                                            className="w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 border-gray-300 focus:ring-gray-500"
                                        />
                                    </div>
                                    {touched.mobile_number && errors.mobile_number && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.mobile_number}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-full">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your description"
                                        rows="4"
                                        className="w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 border-gray-300 focus:ring-gray-500"
                                    />
                                    {touched.description && errors.description && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

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
                )}
            </div>
        </div>
    )
}

export default ProductAccordion
