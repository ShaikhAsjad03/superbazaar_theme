"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderDetails } from "@/services/accountsService";
import { ImageUrl } from "@/helper/imageUrl";
import StitchingOptions from "@/components/StitchingOption";
import Image from "next/image";
import PriceConverter from "@/components/PriceConverter";

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

    if (!order) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="animate-pulse text-gray-600">Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {/* Header */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Order #{order.orderId}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Placed on {order.orderDate}
                        </p>
                    </div>
                    <span
                        className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm transition ${order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-green-100 text-green-800 border border-green-200"
                            }`}
                    >
                        {order.status}
                    </span>
                </div>
            </div>

            {/* Layout col-8 / col-4 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* LEFT (col-8) Order Items */}
                <div className="md:col-span-8">
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Order Items
                        </h2>

                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 text-gray-600 text-sm font-medium border-b pb-2 mb-3">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Subtotal</div>
                        </div>

                        {/* Items */}
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
                                                src={ImageUrl(item?.productsnapshots?.image)}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="rounded-lg object-cover max-h-[120px] shadow-sm group-hover:scale-105 transition duration-300"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <StitchingOptions stitching={item.stitching} />
                                                {sizeObj?.value && (
                                                    <p className="text-sm text-gray-500">
                                                        Size: {sizeObj.value}
                                                    </p>
                                                )}

                                                {item.isCatalogue && item.products && (
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
                                                                        className="flex items-center gap-2 text-sm"
                                                                    >
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
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-2 text-center font-medium text-gray-700">
                                            <PriceConverter price={item.productsnapshots?.price} />
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-2 text-center text-gray-700">
                                            {item.quantity}
                                        </div>

                                        {/* Subtotal */}
                                        <div className="col-span-2 text-right font-semibold text-gray-800">
                                            ₹{item.productsnapshots?.subtotal}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT (col-4) Address + Payment */}
                <div className="md:col-span-4 space-y-6">
                    {/* Billing Address */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
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

                    {/* Shipping Address */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
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

                    {/* Payment Summary */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
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
                            <div className="flex justify-between font-semibold text-gray-800 text-base">
                                <span>Total</span>
                                <span>₹{order.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
