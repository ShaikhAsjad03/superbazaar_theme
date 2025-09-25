"use client";
import React, { useState } from "react";
import { ArrowBigDown, Eye, Scissors } from "lucide-react";
import "./style/StitchingOption.css"
import PriceConverter from "./PriceConverter";
const StitchingOptions = ({ stitching }) => {
    const [openMeasurements, setOpenMeasurements] = useState(null);

    if (!stitching || stitching.length === 0) return null;

    return (
        <div className="text-sm">
            <p className="font-medium flex items-center gap-1">
                Stitching:
                <ArrowBigDown className="text-red-500" size={14} />
            </p>
            <ul className="list-disc ml-1 space-y-1">
                {stitching.map((s, idx) => {
                    let measurements = [];
                    try {
                        measurements = s.measurment ? JSON.parse(s.measurment) : [];
                    } catch {
                        measurements = [];
                    }

                    return (
                        <li key={idx} className="flex items-center gap-2">
                            <span>
                                {s.option?.name}{" "}
                                {s.option?.price && (
                                    <span className="text-gray-600 text-xs"><PriceConverter price={s.option.price} /></span>
                                )}
                            </span>
                            {measurements.length > 0 && (
                                <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => setOpenMeasurements(idx)}
                                >
                                    <Eye size={16} />
                                </button>
                            )}

                            {openMeasurements === idx && (
                                <div
                                    onClick={() => setOpenMeasurements(null)}
                                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-100 relative">
                                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 border-b pb-2 border-gray-400">
                                            <Scissors className="text-pink-600 animate-cut" size={20} />
                                            Measurements for {s.option?.name}
                                        </h3>
                                        <ul className="list-disc ml-5 text-sm space-y-1">
                                            {measurements.map((m, i) => (
                                                <li key={i}>
                                                    {m.name}: {m.value}
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                            onClick={() => setOpenMeasurements(null)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StitchingOptions;
