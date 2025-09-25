"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addressschema } from "@/schema/schema";
import AddressList from "./AddressCards";
import { useSession } from "next-auth/react";
import { deleteUserAddress, getUserAddress, postuserAddress } from "@/services/accountsService";

const AddressTheme2 = () => {
    const { data: session, } = useSession();
    const [showForm, setShowForm] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const fetchAddress = async () => {
        const id = session?.user?.id
        const data = await getUserAddress(id)
        setAddresses(data)
    }
    useEffect(() => {
        if (session?.user?.id) fetchAddress();
    }, [session?.user?.id])
    const initialValues = {
        email: "",
        fullName: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        address1: "",
        address2: "",
        companyname: "",
        GstNumber: "",
        mobile: "",
        whatsapp: "",
        defaultBilling: false,
        defaultShipping: false,
    };
    const {
        errors,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        resetForm,
        setValues,
    } = useFormik({
        initialValues,
        validationSchema: addressschema,
        onSubmit: async (values) => {
            try {
                values.user_id = session?.user?.id
                const response = await postuserAddress(values)
                if (response.isSuccess) {
                    fetchAddress()
                    resetForm();
                    setShowForm(false);
                }

            } catch (errors) {
                return errors
            }
        },
    });
    const handleEdit = (index) => {
        setValues(addresses[index]);
        setEditIndex(index);
        setShowForm(true);
    };
    const handleDelete = async (id) => {
        try {
            const response = await deleteUserAddress(id)
            fetchAddress()
        } catch (errors) {
            return errors
        }
    }
    return (
        <div className="container mx-auto p-4 border border-gray-300">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold mb-4">Address Page</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setEditIndex(null);
                        setShowForm(!showForm);
                    }}
                    className="mb-4 px-5 py-2 bg-zinc-800 text-white rounded-lg shadow-md hover:bg-zinc-600 transition"
                >
                    Add Address
                </button>
            </div>
            {showForm &&
                <div
                    className={`overflow-hidden transition-all duration-500 max-h-[1500px] opacity-100 scale-100`}>
                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-3 gap-4 p-6 shadow-lg bg-white mb-6 mt-2"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Full Name"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.fullName && errors.fullName && (
                                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
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
                                placeholder="Email"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Mobile"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.mobile && errors.mobile && (
                                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Country"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.country && errors.country && (
                                <p className="text-xs text-red-500 mt-1">{errors.country}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="State"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.state && errors.state && (
                                <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="City"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.city && errors.city && (
                                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={values.zipCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Zip Code"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.zipCode && errors.zipCode && (
                                <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
                            )}
                        </div>
                        <div className="relative md:col-span-2">
                            <textarea
                                type="text"
                                id="address1"
                                name="address1"
                                value={values.address1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Address Line 1"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                            {touched.address1 && errors.address1 && (
                                <p className="text-xs text-red-500 mt-1">{errors.address1}</p>
                            )}
                        </div>
                        <div className="relative md:col-span-2">
                            <textarea
                                type="text"
                                id="address2"
                                name="address2"
                                value={values.address2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Address Line 2"
                                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-zinc-500"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition"
                            >
                                {editIndex !== null ? "Update Address" : "Save Address"}
                            </button>
                        </div>
                    </form>
                </div>}
            <AddressList
                addresses={addresses}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                fetchAddress={fetchAddress} />
        </div>
    )
};


export default AddressTheme2