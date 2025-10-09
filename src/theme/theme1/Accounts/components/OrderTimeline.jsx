"use client";
import React from "react";
import { Check, Package, Truck, Clock } from "lucide-react";

const statusIcons = {
  completed: Check,
  packaging: Package,
  shipped: Truck,
  pending: Clock,
};

const VerticalTimeline = ({ events }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {events.map((event, index) => {
        const Icon = statusIcons[event.status] || Clock;

        return (
          <li key={index} className={`mb-10 ms-4 last:mb-0 relative`}>
            {/* Icon Dot */}
            <div className="absolute -left-5 top-0">
              <Icon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Time */}
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {event.date}
            </time>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>

            {/* Description */}
            {event.description && (
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
            )}

            {/* Optional Link */}
            {event.link && (
              <a
                href={event.link}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Learn more
                <svg
                  className="w-3 h-3 ml-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
};

const OrderHistoryPage = () => {
  const history = [
    { title: "Order Placed", date: "11/07/2024 2:36pm", status: "completed" },
    { title: "Product Packaging", date: "12/07/2024 4:34pm", status: "packaging" },
    {
      title: "Product Shipped",
      date: "10/07/2024 4:30pm",
      courier: "FedEx World Service Center",
      deliveryDate: "12/07/2024",
      status: "shipped",
    },
    {
      title: "Out for Delivery",
      date: "13/07/2024 10:00am",
      tracking: "2307-3215-6759",
      warehouse: "T-Shirt 10b",
      status: "pending",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Timeline
      </h1>
      <VerticalTimeline events={history} />
    </div>
  );
};

export default OrderHistoryPage;
