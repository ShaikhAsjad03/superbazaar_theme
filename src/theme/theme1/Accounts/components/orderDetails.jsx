"use client";
import BankPayment from "@/app/checkout/components/bankPayment";
import PaymentMethod from "@/app/checkout/components/paymentMethod";
import StitchingOptions from "@/components/StitchingOption";
import { ImageUrl } from "@/helper/imageUrl";
import { getOrderDetails } from "@/services/accountsService";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderDetail = ({ orderid }) => {
  const [order, setOrder] = useState(null);
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);



  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderDetails(orderid);
      if (res.isSuccess) {
        setOrder(res.data);
      }
    };
    fetchOrder();
  }, [orderid]);

  const toggleCatalogue = (id) => {
    setOpenCatalogueIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };


  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };
  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-gray-500 text-lg">
          Loading order details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-xl duration-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Order #{order.orderId}
            </h1>
            <p className="text-gray-500 mt-1">
              Placed on {order.orderDate}
            </p>
          </div>
          <span
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition ${order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
              : "bg-green-100 text-green-800 border border-green-200"
              }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Billing Address
          </h2>
          <div className="text-gray-600 text-sm space-y-1">
            <p>{order.billingAddress?.fullName || "N/A"}</p>
            <p>{order.billingAddress?.address1 || "N/A"}</p>
            <p>
              {order.billingAddress?.city}, {order.billingAddress?.state}
            </p>
            <p>{order.billingAddress?.country}</p>
            <p>Zip: {order.billingAddress?.zipCode}</p>
            <p>Phone: {order.billingAddress?.mobile}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Shipping Address
          </h2>
          <div className="text-gray-600 text-sm space-y-1">
            <p>{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.address1}</p>
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.state}
            </p>
            <p>{order.shippingAddress?.country}</p>
            <p>Zip: {order.shippingAddress?.zipCode}</p>
            <p>Phone: {order.shippingAddress?.mobile}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Order Items
        </h2>

        <div className="hidden md:grid grid-cols-12 text-gray-600 text-sm font-medium border-b pb-2 mb-3">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        <div className="divide-y divide-gray-100">
          {order?.orderItems?.map((item) => {
            let sizeObj;
            try {
              sizeObj = JSON.parse(item.size);
            } catch {
              sizeObj = {};
            }

            return (
              <div
                key={item.id}
                className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start py-4 gap-4 md:gap-2 group"
              >
                <div className="col-span-6 flex gap-4 w-full">
                  <Image
                    src={ImageUrl(item.productsnapshots?.image)}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover max-h-[120px] shadow-sm group-hover:scale-105 transition duration-300"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base text-gray-800">
                      {item.name}
                    </h3>
                    {item.productsnapshots.stitching &&
                      item.productsnapshots.stitching?.length > 0 && (
                        <StitchingOptions
                          stitching={item.productsnapshots.stitching}
                        />
                      )}
                    {sizeObj?.value && (
                      <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                    )}

                    {item?.isCatalogue && item?.products && (
                      <div className="mt-3">
                        <button
                          onClick={() => toggleCatalogue(item.id)}
                          className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
                        >
                          {openCatalogueIds.includes(item.id)
                            ? "Hide Products"
                            : "Show Products"}
                        </button>
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${openCatalogueIds.includes(item.id)
                            ? "max-h-96 opacity-100 mt-3"
                            : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="space-y-2 pl-4 border-l">
                            {item.products.map((p) => (
                              <div
                                key={p.code}
                                className="flex items-center justify-between text-sm gap-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-12 relative flex-shrink-0">
                                    <Image
                                      src={ImageUrl(p.image[0])}
                                      alt={p.name}
                                      fill
                                      className="object-contain rounded"
                                      sizes="48px"
                                    />
                                  </div>
                                  <span className="truncate max-w-[150px]">
                                    {p.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-2 text-center font-medium text-gray-700">
                  ₹{item.productsnapshots?.price}
                </div>
                <div className="col-span-2 text-center text-gray-700">
                  {item.quantity}
                </div>
                <div className="col-span-2 text-right font-semibold text-gray-800">
                  ₹{item.productsnapshots?.subtotal}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Payment Summary
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{order.Tax}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- ₹{order.discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shippingcharge}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-gray-800 text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Payment Method
          </h2>

          <div
            className="flex flex-col md:flex-row md:justify-between items-start md:items-center text-gray-600 py-2 border-b last:border-b-0">
            <span className="capitalize font-medium">{order?.payment[0]?.paymentMethod}</span>
            <span
              className={`mt-1 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${order?.payment[0]?.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                : "bg-green-100 text-green-800 border border-green-200"
                }`}
            >
              {order?.payment[0]?.status}
            </span>
          </div>


          {order?.payment[0]?.status === "PENDING" && (
            <BankPayment orderId={orderid} />
          )}
          {/* {order.payment.map((p, idx) => (
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
