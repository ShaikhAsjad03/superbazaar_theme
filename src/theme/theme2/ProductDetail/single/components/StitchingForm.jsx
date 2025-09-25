"use client";
import PriceConverter from "@/components/PriceConverter";
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

    const handleInputChange = (optionId, fieldId, value, field) => {
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
            } else if (field && field.range) {
                const [min, max] = field.range.split("-").map(Number);
                const num = Number(value);
                if (isNaN(num) || num < min || num > max) {
                    newErrors[`${optionId}_${fieldId}`] = `Value must be between ${min} and ${max}`;
                } else {
                    delete newErrors[`${optionId}_${fieldId}`];
                }
            } else {
                delete newErrors[`${optionId}_${fieldId}`];
            }

            return newErrors;
        });
    };

    useEffect(() => {
        const sections = Array.isArray(stitchingData) ? stitchingData : [];
        const allOptions = sections.flatMap((s) =>
            Array.isArray(s.stitchingOption) ? s.stitchingOption : []
        );

        const finalData = {
            stitching: Object.entries(formData).map(([optionId, fields]) => {
                const option = allOptions.find((o) => o.id === optionId);

                return {
                    optionid: optionId,
                    measurment:
                        Array.isArray(option?.stitchingValues)
                            ? option.stitchingValues.map((field) => ({
                                name: field.name,
                                value: fields[field.id] || "",
                            }))
                            : [],
                };
            }),
            isValid: Object.entries(formData).every(([optionId, fields]) => {
                const option = allOptions.find((o) => o.id === optionId);
                if (!Array.isArray(option?.stitchingValues) || option.stitchingValues.length === 0)
                    return true;

                return option.stitchingValues.every(
                    (field) => fields[field.id] && fields[field.id].trim() !== ""
                );
            }),
        };

        onChange?.(finalData);
    }, [formData, stitchingData, onChange]);

    const sections = Array.isArray(stitchingData) ? stitchingData : [];

    return (
        <div className="px-4 pb-4 text-sm">
            {sections.map((section) => {
                const options = Array.isArray(section.stitchingOption)
                    ? section.stitchingOption
                    : [];
                const radioOptions = options.filter((o) => o.type === "Redio");
                const checkboxOptions = options.filter((o) => o.type === "CheckBox");

                return (
                    <div key={section.id} className="mb-6">
                        <h4 className="font-semibold mb-2">{section.name}</h4>

                        {radioOptions.length > 0 && (
                            <div className="space-y-2">
                                {radioOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-start gap-2 mb-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`stitching_${section.id}`}
                                            value={option.id}
                                            checked={selectedStitch === option.id}
                                            onChange={() => handleRadioChange(option)}
                                            className="mt-1 accent-blue-600"
                                        />
                                        <span>
                                            <span>
                                                {option.name} – <PriceConverter price={option.price} />{" "}
                                            </span>
                                            {option.fastDelivery && (
                                                <span className="text-red-600">(Same day dispatch)</span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {checkboxOptions.length > 0 && (
                            <div className="space-y-2">
                                {checkboxOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={!!formData[option.id]}
                                            onChange={() => handleCheckboxChange(option)}
                                            className="w-4 h-4 accent-red-500"
                                        />
                                        <span>
                                            {option.name}{" "}
                                            {option.price > 0 && <>– <PriceConverter price={option.price} /></>}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {options
                            .filter((opt) => opt.id === selectedStitch)
                            .map((option) => {
                                const values = Array.isArray(option.stitchingValues)
                                    ? option.stitchingValues
                                    : [];
                                if (values.length === 0) return null;

                                return (
                                    <div key={option.id} className="mt-4 pt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {values.map((field) => (
                                                <div key={field.id} className="flex flex-col">
                                                    <label className="mb-1 font-medium">
                                                        {field.name}{" "}
                                                        {field.range && (
                                                            <span className="text-sm text-gray-500">({field.range})</span>
                                                        )}
                                                    </label>

                                                    {field.type === "TextField" ? (
                                                        <input
                                                            type="number"
                                                            placeholder={field.range}
                                                            value={formData[option.id]?.[field.id] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(option.id, field.id, e.target.value, field)
                                                            }
                                                            className={`border rounded-lg px-3 py-2 outline-none ${errors[`${option.id}_${field.id}`] ? "border-red-500" : "border-gray-300"
                                                                }`}
                                                        />
                                                    ) : field.type === "Dropdown" ? (
                                                        <select
                                                            value={formData[option.id]?.[field.id] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(option.id, field.id, e.target.value, field)
                                                            }
                                                            className={`border rounded-lg px-3 py-2 outline-none ${errors[`${option.id}_${field.id}`] ? "border-red-500" : ""
                                                                }`}
                                                        >
                                                            <option value="">Select</option>
                                                            {(field.values || "").split(",").map((val) => (
                                                                <option key={val} value={val}>
                                                                    {val}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : null}

                                                    {errors[`${option.id}_${field.id}`] && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors[`${option.id}_${field.id}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
}
