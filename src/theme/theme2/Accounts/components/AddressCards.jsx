"use client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

const AddressList = ({ addresses, handleEdit, handleDelete }) => {
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.map((data, i) => (
                <div
                    key={i}
                    className="relative border border-gray-300 rounded-lg shadow p-4 min-h-[200px] flex flex-col justify-between"
                >
                    <div className="absolute top-2 right-2">
                        <MoreVertical
                            className="text-gray-500 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuIndex(activeMenuIndex === i ? null : i);
                            }}
                        />
                        {activeMenuIndex === i && (
                            <div className="absolute top-6 right-0 z-20 bg-white border rounded shadow-md w-28">
                                <div
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuIndex(null);
                                        handleEdit(i);
                                    }}
                                >
                                    Edit
                                </div>
                                <div
                                    className="px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuIndex(null);
                                        handleDelete(data.id);
                                    }}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="mb-1 text-sm">{data.email}</p>
                    <p className="mb-1 text-sm font-medium">{data.fullName}</p>
                    <p className="mb-1 text-sm">{data.address1}</p>
                    <p className="mb-1 text-sm">{data.city}, {data.state}</p>
                    <p className="mb-1 text-sm">{data.country} - {data.zipCode}</p>
                    <p className="mb-1 text-sm">{data.mobile}</p>
                </div>
            ))}
        </div>
    );
};

export default AddressList;
