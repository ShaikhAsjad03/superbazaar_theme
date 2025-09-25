"use client";
import React, { useEffect, useState } from "react";
import { Truck } from "lucide-react";

const FreeShippingProgress = ({ currentAmount, shippingThreshold, isModalOpen }) => {
  const [truckProgress, setTruckProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(0);

  const target = Math.min((currentAmount / shippingThreshold) * 100, 100);

  useEffect(() => {
    if (isModalOpen) {
      setTruckProgress(target);
      setBarProgress(target);
    } else {
      setTruckProgress(0);
      setBarProgress(0);
    }
  }, [isModalOpen, target]);

  return (
    <div className="relative p-5 bg-gray-100 rounded-lg">
      <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-visible">
        <div
          className="absolute top-0 left-0 h-2 bg-green-600 rounded-full transition-all duration-3000 ease-in-out"
          style={{ width: `${barProgress}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${truckProgress}%`, transition: "left 2s ease-in-out" }}
        >
          <div className="w-9 h-9 border-2 border-green-600 bg-white rounded-full flex items-center justify-center p-1">
            <Truck className="text-black" size={16} />
          </div>
        </div>
      </div>

      <div className="text-center mt-4 font-semibold ">
        Congratulations! Fast Shipping is enabled
      </div>
    </div>
  );
};

export default FreeShippingProgress;
