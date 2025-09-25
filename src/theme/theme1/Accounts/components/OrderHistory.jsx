"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Eye, FileDown } from "lucide-react";
import Pagination from "../../../../components/Pagination";
import { useSession } from "next-auth/react";
import { postuserOrderHistory } from "@/services/accountsService";
import Link from "next/link";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

const OrderHistorythem1 = () => {
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by Order ID, Amount, or Date..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
      <div className="relative overflow-x-auto shadow-lg sm:rounded-xl hidden md:block">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th scope="col" className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Order Status</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders?.length > 0 && orders?.map((order, idx) => (
              <tr
                key={idx}
                className="bg-white border-b hover:bg-blue-50 transition duration-200"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.orderId}
                </td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ₹ {order.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.paymentStatus] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex gap-2">
                  <Link 
                   className="p-2 rounded-full hover:bg-blue-100 transition"
                  href={`/orders/${order?.orderId}`}>
                    <Eye className="w-5 h-5 text-gray-600" />
                  </Link>
<Link 
                   className="p-2 rounded-full hover:bg-blue-100 transition"
                  href={`/invoice/${order?.orderId}`}>
                        <FileDown className="w-5 h-5 text-red-500"/>
                  </Link>
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-6 text-center text-gray-500"
                >
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="md:hidden space-y-4 mt-6">
        {orders && orders?.length > 0 && orders?.map((order, idx) => (
          <div
            key={idx}
            className="border rounded-xl shadow-lg p-4 bg-white space-y-2 hover:shadow-xl transition"
          >
            <p className="text-sm">
              <span className="font-semibold">Order ID:</span> {order.orderId}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Date:</span> {order.orderDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Amount:</span> ₹ {order.amount}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Order Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"
                  }`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.paymentStatus] || "bg-gray-100 text-gray-600"
                  }`}
              >
                {order.paymentStatus}
              </span>
            </p>
            <button className="p-2 rounded-full hover:bg-blue-100 transition">
              <Eye className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        ))}
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

export default OrderHistorythem1;
