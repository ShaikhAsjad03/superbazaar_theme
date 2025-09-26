"use client";

import BankPayment from "@/app/checkout/components/bankPayment";
import PriceConverter from "@/components/PriceConverter";
import StitchingOptions from "@/components/StitchingOption";
import { ImageUrl } from "@/helper/imageUrl";
import { getOrderDetails } from "@/services/accountsService";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderDetail = ({ orderid }) => {
  const [order, setOrder] = useState(null);
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);
  const fetchOrder = async () => {
    const res = await getOrderDetails(orderid);
    if (res.isSuccess) setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderid]);

  const toggleCatalogue = (id) => {
    setOpenCatalogueIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-gray-500 text-lg">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl md:max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order #{order.orderId}</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Placed on {order.orderDate}</p>
        </div>
        <span
          className={`mt-2 md:mt-0 px-4 py-1 md:px-5 md:py-2 rounded-full text-sm md:text-sm font-medium shadow-sm ${
            order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {["Billing Address", "Shipping Address"].map((title, idx) => {
          const addr = idx === 0 ? order.billingAddress : order.shippingAddress;
          return (
            <div
              key={title}
              className="bg-white shadow rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition duration-300"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 border-b pb-1 md:pb-2">
                {title}
              </h2>
              <div className="text-gray-600 text-sm md:text-base space-y-1">
                <p>{addr?.fullName || "N/A"}</p>
                <p>{addr?.address1 || "N/A"}</p>
                <p>
                  {addr?.city}, {addr?.state}
                </p>
                <p>{addr?.country}</p>
                <p>Zip: {addr?.zipCode}</p>
                <p>Phone: {addr?.mobile}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white shadow rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition duration-300">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 border-b pb-1 md:pb-2">
          Order Items
        </h2>

        <div className="flex flex-col gap-4">
          {order?.orderItems?.map((item) => {
            let sizeObj = {};
            try {
              sizeObj = JSON.parse(item.size);
            } catch {}

            return (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 border-b last:border-b-0 pb-3">
                <div className="flex flex-row md:flex-1 gap-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0">
                    <Image
                      src={ImageUrl(item.productsnapshots?.image)}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800">{item.name}</h3>
                    {item.productsnapshots.stitching && item.productsnapshots.stitching.length > 0 && (
                      <StitchingOptions stitching={item.productsnapshots.stitching} />
                    )}
                    {sizeObj?.value && <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>}

                    {item?.isCatalogue && item?.products && (
                      <div className="mt-2 md:mt-3">
                        <button
                          onClick={() => toggleCatalogue(item.id)}
                          className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
                        >
                          {openCatalogueIds.includes(item.id) ? "Hide Products" : "Show Products"}
                        </button>
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            openCatalogueIds.includes(item.id) ? "max-h-72 opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="space-y-2 pl-3 border-l">
                            {item.products.map((p) => (
                              <div key={p.code} className="flex items-center gap-2 text-sm">
                                <div className="w-12 h-12 relative flex-shrink-0">
                                  <Image src={ImageUrl(p.image[0])} alt={p.name} fill className="object-contain rounded" />
                                </div>
                                <span className="truncate">{p.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col md:items-end justify-between mt-2 md:mt-0 gap-2 md:gap-1 w-full md:w-auto text-sm md:text-base text-gray-700">
                  <PriceConverter price={item.productsnapshots?.price || 0} />
                  <span>{item.quantity}</span>
                  <PriceConverter price={item.productsnapshots?.subtotal || 0} className="font-semibold text-gray-800" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white shadow rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition duration-300">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 border-b pb-1 md:pb-2">Payment Summary</h2>
          <div className="space-y-2 text-sm md:text-base text-gray-600">
            {[
              { label: "Subtotal", value: order.subtotal },
              { label: "Tax", value: order.Tax },
              { label: "Discount", value: 0 },
              { label: "Shipping", value: order.shippingcharge },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <PriceConverter price={item.value || 0} />
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-gray-800 text-base md:text-lg">
              <span>Total</span>
              <PriceConverter price={order.totalAmount || 0} />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition duration-300">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 border-b pb-1 md:pb-2">Payment Method</h2>
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center text-gray-600 py-2 border-b last:border-b-0">
            <span className="capitalize font-medium">{order?.payment[0]?.paymentMethod}</span>
            <span
              className={`mt-1 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                order?.payment[0]?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}
            >
              {order?.payment[0]?.status}
            </span>
          </div>
          {order?.payment[0]?.status === "PENDING" && <BankPayment orderId={orderid} cb={fetchOrder}/>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
