"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import StitchingOptions from "@/components/StitchingOption";
import PriceConverter from "@/components/PriceConverter";
const OrderSummary = ({ cartData, shippingCharge }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (cartData?.data) {
      setCart(cartData.data);
    }
  }, [cartData]);

  return (
    <div className="shadow-lg rounded-lg p-6 mt-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">  Order Summary </h2>
      <div className="divide-y h-[150px] overflow-auto">
        {Array.isArray(cart) && cart.map((item) => {
          let sizeObj;
          try {
            sizeObj = JSON.parse(item.size);
          } catch {
            sizeObj = {};
          }

          return (
            <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start justify-between py-4 gap-4">
              <div className="col-span-6 flex gap-4">
                <Image
                  src={ImageUrl(item.image)}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover max-h-[100px] w-auto "
                />
                <div>
                  <h3 className="font-normal text-sm">{item.name}</h3>
                  <StitchingOptions stitching={item.stitching} />
                  {sizeObj?.value && (
                    <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                  )}
                </div>
              </div>
              <div className="col-span-2 text-center">
                ₹{item.price}
              </div>
              <div className="col-span-2 flex justify-between md:justify-end items-center gap-2">
                <p>₹{item.subtotal}</p>
              </div>
            </div>
          );
        })}

        {/* {cart.map((item) => {
          let sizeObj;
          try {
            sizeObj = JSON.parse(item.size);
          } catch {
            sizeObj = {};
          }

          return (
            <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start justify-between py-4 gap-4">
              <div className="col-span-6 flex gap-4">
                <Image
                  src={ImageUrl(item.image)}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover max-h-[100px] w-auto " />
                <div>
                  <h3 className="font-normal text-sm">{item.name}</h3>
                  <StitchingOptions stitching={item.stitching} />
                  {sizeObj?.value && (
                    <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                  )}
                </div>
              </div>
              <div className="col-span-2 text-center ">
                ₹{item.price}
              </div>
              <div className="col-span-2 flex justify-between md:justify-end items-center gap-2 ">
                <p>₹{item.subtotal}</p>
              </div>
            </div>
          );
        })} */}
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-700">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <PriceConverter price={cartData?.totalSubtotal || 0} />
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <PriceConverter price={cartData?.totalTax || 0} />
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping & Handling Charge</span>
          <PriceConverter price={shippingCharge?.price || 0} />
        </div>
        <div className="flex justify-between font-semibold text-gray-900 text-base">
          <span>Total</span>
          <PriceConverter price={cartData?.totalOrder + shippingCharge?.price || 0} />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
