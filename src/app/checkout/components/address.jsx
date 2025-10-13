"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Loader2, MapPinHouse, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { addressschema } from "@/schema/schema";
import { getUserAddress, postuserAddress } from "@/services/accountsService";
import { COUNTRIES } from "@/data/countrylists";

const CheckoutAddress = ({ onCountryChange, onAddressChange }) => {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const fetchAddress = async () => {
    if (!session?.user?.id) return;
    const data = await getUserAddress(session.user.id);
    setAddresses(data || []);
    if (!data || data.length === 0) setShowForm(true);
    else setShowForm(false);
  };

  useEffect(() => {
    fetchAddress();
  }, [session?.user?.id]);

  useEffect(() => {
    const selectedShipping = addresses.find((addr) => addr.id === shippingAddress);
    const selectedBilling = sameAsBilling
      ? selectedShipping
      : addresses.find((addr) => addr.id === billingAddress);

    if (onAddressChange) {
      onAddressChange({
        shippingAddress: selectedShipping || null,
        billingAddress: selectedBilling || null,
      });
    }

    if (selectedShipping?.country && onCountryChange) {
      onCountryChange(selectedShipping.country);
    }
  }, [shippingAddress, billingAddress, sameAsBilling]);

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
    setFieldValue,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: addressschema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        values.user_id = session?.user?.id;
        const response = await postuserAddress(values);
        if (response.isSuccess) {
          await fetchAddress();
          resetForm();
          setShowForm(false);
        }
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            Address <MapPinHouse size={18} />
          </h2>

          {addresses.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 border rounded shadow-sm hover:bg-gray-900 hover:text-white transition"
            >
              <Plus size={16} /> Add New
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5"
          >
            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full Name"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mobile"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.mobile && errors.mobile && (
                <p className="text-xs text-red-500">{errors.mobile}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Select
                name="country"
                placeholder="Select Country"
                options={COUNTRIES}
                value={COUNTRIES.find((c) => c.label === values.country)}
                onChange={(option) => setFieldValue("country", option.value)}
                onBlur={handleBlur}
                styles={{
                  control: (base) => ({ ...base, minHeight: 42, height: 42 }),
                  valueContainer: (base) => ({ ...base, height: 42, padding: "0 8px" }),
                  input: (base) => ({ ...base, margin: 0, padding: 0 }),
                  indicatorsContainer: (base) => ({ ...base, height: 42 }),
                }}
              />
              {touched.country && errors.country && (
                <p className="text-xs text-red-500">{errors.country}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="State"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.state && errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.city && errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Zip Code"
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.zipCode && errors.zipCode && (
                <p className="text-xs text-red-500">{errors.zipCode}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <textarea
                id="address1"
                name="address1"
                value={values.address1}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Address Line 1"
                rows={3}
                className="border rounded px-3 py-3 text-sm w-full"
              />
              {touched.address1 && errors.address1 && (
                <p className="text-xs text-red-500">{errors.address1}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <textarea
                id="address2"
                name="address2"
                value={values.address2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Address Line 2"
                rows={3}
                className="border rounded px-3 py-3 text-sm w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`sm:col-span-2 px-4 py-2 bg-zinc-900 text-white rounded shadow hover:bg-gray-700 flex justify-center items-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
          </form>
        )}

        {!showForm && addresses.length > 0 && (
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Select Shipping Address
            </label>
            <select
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full mt-2 border rounded px-3 py-3 text-sm"
            >
              <option value="">-- Choose Shipping Address --</option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.fullName}, {addr.city}, {addr.country}
                </option>
              ))}
            </select>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={() => setSameAsBilling(!sameAsBilling)}
              />
              <span className="text-sm text-gray-700">
                My billing and shipping address are the same
              </span>
            </div>

            {!sameAsBilling && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Select Billing Address
                </label>
                <select
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full mt-2 border rounded px-3 py-3 text-sm"
                >
                  <option value="">-- Choose Billing Address --</option>
                  {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.fullName}, {addr.city}, {addr.country}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutAddress;
