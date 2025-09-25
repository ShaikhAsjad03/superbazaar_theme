"use client";
import { getShippingMethod } from "@/services/checkOutService";
import { TruckElectric } from "lucide-react";
import { useEffect, useState } from "react";
const ShippingMethod = ({ country, weight, totalOrder, onShippingChange }) => {
    const [methods, setMethods] = useState([]);
    const [selected, setSelected] = useState({});
    const fetchShippingMethods = async () => {
        try {
            const query = `country=${country}&weight=${weight}&totalOrder=${totalOrder}`;
            const res = await getShippingMethod(query);
            setMethods(res?.shippingMethods || []);
        } catch (err) {
            return err
        }
    };

    useEffect(() => {
        if (country && weight > 0) {
            fetchShippingMethods();
        }
    }, [country, weight, totalOrder]);

    const handleSelect = (method) => {
        setSelected(method);
        if (onShippingChange) {
            onShippingChange(method);
        }
    };
    return (
        <div className="shadow-lg rounded-lg p-6 mt-6 bg-white mb-2">
            <div className="flex gap-2 items-center mb-4">
                <h1 className="text-lg font-semibold text-gray-900"> Shipping Method  </h1>
                <TruckElectric size={18} className="text-gray-600" />
            </div>
            {methods.length === 0 && <p className="text-sm text-gray-500"> No shipping methods available. </p>}
            <div className="space-y-4">
                {Array.isArray(methods) && methods.map((m) => (
                    <label key={m.id} className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 
        ${selected?.id === m.id ? "border-indigo-600 bg-indigo-100 shadow-md" : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50"}`}>
                        <div className="flex items-start space-x-3">
                            <input
                                type="radio"
                                name="shipping"
                                value={m.id}
                                checked={selected?.id === m.id}
                                onChange={() => handleSelect(m)}
                                className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div>
                                <p className="font-medium text-gray-900">{m.name}</p>
                                <p className="text-xs text-gray-500">{m.description}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-indigo-700">₹{m.price}</p>
                    </label>
                ))}

                {/* {methods.map((m) => (
                    <label
                        key={m.id}
                        className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 
                          ${selected?.id === m.id
                                ? "border-indigo-600 bg-indigo-100 shadow-md"
                                : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                            }`} >
                        <div className="flex items-start space-x-3">
                            <input
                                type="radio"
                                name="shipping"
                                value={m.id}
                                checked={selected?.id === m.id}
                                onChange={() => handleSelect(m)}
                                className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer" />
                            <div>
                                <p className="font-medium text-gray-900">{m.name}</p>
                                <p className="text-xs text-gray-500">{m.description}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-indigo-700">₹{m.price}</p>
                    </label>
                ))} */}
            </div>
        </div>
    );
};

export default ShippingMethod;
