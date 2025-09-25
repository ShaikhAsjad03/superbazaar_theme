"use client";
import { useState, useEffect } from "react";

export default function StitchingForm({ stitchingData, onChange }) {
    const [selectedStitch, setSelectedStitch] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleRadioChange = (option) => {
        setSelectedStitch(option.id);
        setFormData({ [option.id]: {} });
        setErrors({});
    };

    const handleCheckboxChange = (option) => {
        setFormData((prev) => {
            const current = prev[option.id];
            if (current) {
                const updated = { ...prev };
                delete updated[option.id];
                return updated;
            } else {
                return { ...prev, [option.id]: {} };
            }
        });
        setErrors({});
    };

    const handleInputChange = (optionId, fieldId, value) => {
        setFormData((prev) => ({
            ...prev,
            [optionId]: {
                ...(prev[optionId] || {}),
                [fieldId]: value,
            },
        }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (!value || value.trim() === "") {
                newErrors[`${optionId}_${fieldId}`] = "This field is required";
            } else {
                delete newErrors[`${optionId}_${fieldId}`];
            }
            return newErrors;
        });
    };

    useEffect(() => {
        const finalData = {
            stitching: Object.entries(formData).map(([optionId, fields]) => {
                const option = stitchingData
                    .flatMap((s) => s.stitchingOption)
                    .find((o) => o.id === optionId);

                return {
                    optionid: optionId,
                    measurment:
                        option?.stitchingValues?.map((field) => ({
                            name: field.name,
                            value: fields[field.id] || "",
                        })) || [],
                };
            }),
            isValid: Object.entries(formData).every(([optionId, fields]) => {
                const option = stitchingData
                    .flatMap((s) => s.stitchingOption)
                    .find((o) => o.id === optionId);

                if (!option?.stitchingValues?.length) return true;
                return option.stitchingValues.every(
                    (field) => fields[field.id] && fields[field.id].trim() !== ""
                );
            }),
        };

        onChange?.(finalData);
    }, [formData, stitchingData, onChange]);


    return (
        <div className="space-y-2 rounded-xl">
            {stitchingData && stitchingData?.length > 0 && stitchingData?.map((section) => (
                <div key={section.id} className="space-y-1">
                    <h2 className="text-lg font-semibold">{section.name}</h2>
                    {section.stitchingOption.some((o) => o.type === "Redio") && (
                        <div className="flex flex-wrap gap-4">
                            {section.stitchingOption.map(
                                (option) =>
                                    option.type === "Redio" && (
                                        <label
                                            key={option.id}
                                            className={`px-6 py-4 min-w-[160px] min-h-[100px] flex flex-col items-center justify-center border rounded-xl cursor-pointer text-center transition ${selectedStitch === option.id
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300 hover:border-gray-400"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="stitching"
                                                value={option.id}
                                                checked={selectedStitch === option.id}
                                                onChange={() => handleRadioChange(option)}
                                                className="hidden"
                                            />
                                            <span className="font-medium text-gray-800">
                                                {option.name}
                                            </span>
                                            {option.price > 0 && (
                                                <span className="mt-2 text-red-500 text-sm">
                                                    + ₹{option.price}
                                                </span>
                                            )}
                                        </label>
                                    )
                            )}
                        </div>
                    )}
                    {section.stitchingOption.some((o) => o.type === "CheckBox") && (
                        <div className="grid md:grid-cols-1 gap-1">
                            {section.stitchingOption.map(
                                (option) =>
                                    option.type === "CheckBox" && (
                                        <label
                                            key={option.id}
                                            className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={!!formData[option.id]}
                                                onChange={() => handleCheckboxChange(option)}
                                                className="w-3 h-3 accent-red-500"
                                            />
                                            {option.name}
                                            {option.price > 0 && (
                                                <span className="text-sm text-red-500">
                                                    + ₹{option.price}
                                                </span>
                                            )}
                                        </label>
                                    )
                            )}
                        </div>
                    )}
                    {section.stitchingOption
                        .filter((opt) => opt.id === selectedStitch)
                        .map((option) =>
                            option.stitchingValues.length > 0 ? (
                                <div key={option.id} className="space-y-4 mt-4 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                        {option.stitchingValues.map((field) => (
                                            <div key={field.id} className="flex flex-col w-full">
                                                <label className="mb-1 font-medium">
                                                    {field.name}{" "}
                                                    {field.range && (
                                                        <span className="text-sm text-gray-500">
                                                            ({field.range})
                                                        </span>
                                                    )}
                                                </label>
                                                {field.type === "TextField" ? (
                                                    <input
                                                        type="number"
                                                        placeholder={field.range}
                                                        value={formData[option.id]?.[field.id] || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                option.id,
                                                                field.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`border rounded-lg px-3 py-2 outline-none w-full ${errors[`${option.id}_${field.id}`]
                                                            ? "border-red-500"
                                                            : ""
                                                            }`}
                                                    />
                                                ) : field.type === "Dropdown" ? (
                                                    <select
                                                        value={formData[option.id]?.[field.id] || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                option.id,
                                                                field.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`border rounded-lg px-3 py-2 outline-none w-full ${errors[`${option.id}_${field.id}`]
                                                            ? "border-red-500"
                                                            : ""
                                                            }`}
                                                    >
                                                        <option value="">Select</option>
                                                        {field.values.split(",").map((val) => (
                                                            <option key={val} value={val}>
                                                                {val}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : null}
                                                {errors[`${option.id}_${field.id}`] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors[`${option.id}_${field.id}`]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        )}
                </div>
            ))}
        </div>
    );
}
