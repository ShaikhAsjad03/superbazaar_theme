"use client";
import { useEffect, useState } from "react";
import { getPyamentMethod } from "@/services/checkOutService";
import { LockKeyhole, Check } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
const PaymentMethod = ({ onPaymentChange }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const fetchData = async () => {
    try {
      const res = await getPyamentMethod();
      setPaymentMethods(res?.data || []);
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    if (onPaymentChange) {
      onPaymentChange(method);
    }
  };


  

  return (
    <div className="shadow-lg rounded-lg p-6 mt-6 bg-white">
      <div className="flex gap-2 items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Payment Method</h1>
        <LockKeyhole size={18} className="text-gray-600" />
      </div>
      <div className="grid gap-4">
        {paymentMethods.length === 0 && (<p className="text-sm text-gray-500">No payment methods available.</p>)}
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            onClick={() => handleSelect(method)}
            className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition 
              ${selectedMethod?.name === method.name
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-500"
              }`}>
            <div className="flex items-center gap-3">
              {method.image ? (
                <img
                  src={ImageUrl(method.image)}
                  alt={method.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded bg-gray-100 text-gray-600 text-sm font-bold uppercase">
                  {method.name[0]}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 capitalize"> {method.name} </p>
                {method.description && (<p className="text-xs text-gray-500">{method.description}</p>)}
                {method.charge > 0 && (
                  <p className="text-xs text-red-500">Extra charge: ${method.charge} </p>
                )}
              </div>
            </div>
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full border transition ${selectedMethod?.name === method.name
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-400 bg-white"
                }`}>
              {selectedMethod?.name === method.name && <Check size={14} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
