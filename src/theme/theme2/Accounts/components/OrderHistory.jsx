"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import Pagination from "../../../../components/Pagination";
import { useSession } from "next-auth/react";
import { postuserOrderHistory } from "@/services/accountsService";
import Link from "next/link";

const statusClasses = {
    PENDING: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    PAID: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
};

const OrderHistorytheme2 = () => {
    const { data: session, } = useSession();
    const [orders, setOrders] = useState([])
    const [total, setTotalCount] = useState(0)
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("30days");
    const [search, setSearch] = useState("");


    const fetchData = async () => {
        try {
            const userId = session?.user?.id;
            if (!userId) return;
            const payload = { userId, page, perPage: 20, filter, search }
            const response = await postuserOrderHistory(payload);
            setOrders(response.data);
            setTotalCount(response.total);
        } catch (error) {
            return error
        }
    };


    useEffect(() => {
        fetchData();
    }, [page, filter, search, session]);




    return (
        <div className="p-6 bg-gray-50 min-h-screen border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by Order ID, Amount, or Date..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
                <div className="relative">
                    <select
                        className="inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 shadow-sm transition"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="30days">Last 30 days</option>
                        <option value="6months">Last 6 months</option>
                        <option value="1year">This year</option>
                        <option value="all">All orders</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-200 text-center">
                    <thead className="bg-gray-100 uppercase text-sm font-light text-gray-700">
                        <tr>
                            <th className="px-4 py-2 ">Order Id</th>
                            <th className="px-4 py-2">Order Date</th>
                            <th className="px-4 py-2">Order Status</th>
                            <th className="px-4 py-2">Payment Status</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {orders && orders?.length > 0 && orders?.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-sm">
                                <td className="px-4 py-2">
                                    {order.orderId}
                                    {order.expired && (
                                        <div>
                                            <span className="text-red-500 text-xs">{order.expired}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2">{order.orderDate}</td>
                                <td className={`px-4 py-2 `}>
                                    <span className={`  px-2 py-1  text-xs font-semibold rounded-full ${statusClasses[order.orderStatus] || "bg-gray-100 text-gray-700"}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className={`px-4 py-2`}>
                                    <span className={` px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[order.orderStatus] || "bg-gray-100 text-gray-700"}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span>Rs {order.amount}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-center">
                                        <Link
                                            className="p-2 rounded-full hover:bg-blue-100 transition"
                                            href={`/orders/${order?.orderId}`}>
                                            <Eye className="w-5 h-5 text-blue-600" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-8">
                <Pagination
                    currentPage={page}
                    totalCount={total}
                    perPage={20}
                    onPageChange={(p) => setPage(p)}
                />
            </div>
        </div>
    );
};

export default OrderHistorytheme2