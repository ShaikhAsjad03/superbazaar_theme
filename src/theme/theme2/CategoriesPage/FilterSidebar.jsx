"use client";
import { Minus, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const FilterSidebar = ({
    open,
    setOpen,
    filterData,
    onApply,
    setSelectedAttributes,
    selectedAttributes,
    mobile,
}) => {
    const [sections, setSections] = useState({
        price: true,
        color: true,
        fabric: true,
        occasion: true,
        brands: true,
    });
    const [openSections, setOpenSections] = useState({});
    const [priceRange, setPriceRange] = useState([0, 0]);

    useEffect(() => {
        if (!filterData) return;

        const sectionsInit = {};
        if (filterData.attributes) {
            filterData.attributes.forEach((attr) => (sectionsInit[attr.attribute.key] = true));
        }
        if (filterData.brands) sectionsInit["brand"] = true;
        if (filterData.priceRange) sectionsInit["price"] = true;
        setOpenSections(sectionsInit);

        const initAttributes = {};
        filterData.attributes?.forEach((attr) => (initAttributes[attr.attribute.key] = []));
        if (filterData.brands) initAttributes["brand"] = [];
        setSelectedAttributes(initAttributes);

        if (filterData.priceRange) {
            const { minPrice, maxPrice } = filterData.priceRange;
            setPriceRange([minPrice, maxPrice]);
        }
    }, [filterData]);

    const toggleSection = (key) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleAttributeChange = (key, value, name) => {
        setSelectedAttributes((prev) => {
            const current = prev[key] || [];
            const exists = current.find((item) => item.value === value);
            const updated = exists
                ? current.filter((item) => item.value !== value)
                : [...current, { label: name, value }];
            const newAttributes = { ...prev, [key]: updated };
            if (onApply) onApply({ attributes: newAttributes, price: priceRange });
            return newAttributes;
        });
    };

    const handleApply = () => {
        onApply({ attributes: selectedAttributes, price: priceRange });
        if (mobile) setOpen(false);
    };

    const renderSection = (title, name, children) => (
        <div className="mb-4">
            <div
                className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4 mt-5 cursor-pointer"
                onClick={() => toggleSection(name)}
            >
                <span className="font-semibold">{title}</span>
            </div>
            <div>{children}</div>
        </div>
    );

    const content = (
        <div className="bg-white rounded-lg shadow p-4 space-y-6 h-full overflow-y-auto">
            {renderSection(
                "Price",
                "price",
                <div className="px-2">
                    <Slider
                        min={filterData?.priceRange?.minPrice || 0}
                        max={filterData?.priceRange?.maxPrice || 1000}
                        range
                        value={priceRange}
                        onChange={(val) => setPriceRange(val)}
                        trackStyle={[{ backgroundColor: "#3B82F6" }]}
                        handleStyle={[
                            { borderColor: "#3B82F6" },
                            { borderColor: "#3B82F6" },
                        ]}
                        railStyle={{ backgroundColor: "#E5E7EB" }}
                    />
                    <div className="flex justify-between mt-3">
                        <input
                            type="text"
                            value={`${priceRange[0]} - ${priceRange[1]}`}
                            readOnly
                            className="flex-1 border border-gray-400 rounded px-2 py-1 text-sm mr-2"
                        />
                        <button
                            className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                            onClick={handleApply}
                        >
                            Filter
                        </button>
                    </div>
                </div>
            )}
            {filterData?.attributes?.map((att) => (
                <React.Fragment key={att.attribute.key}>
                    {renderSection(
                        att.attribute.name,
                        att.attribute.key,
                        att.attribute.name === "Color" ? (
                            <ul className="flex flex-wrap gap-3">
                                {att?.value?.map((color) => (
                                    <li
                                        key={`${att.attribute.key}-${color.value}`}
                                    >
                                        <span
                                            onClick={() =>
                                                handleAttributeChange(
                                                    att.attribute.key,
                                                    color.value,
                                                    color.name
                                                )
                                            }
                                            className={`block w-8 h-8 rounded-md cursor-pointer relative group ${selectedAttributes[
                                                att.attribute.key
                                            ]?.some(
                                                (item) =>
                                                    item.value ===
                                                    color.value
                                            )
                                                ? "ring-2 ring-blue-500"
                                                : ""
                                                }`}
                                            style={{
                                                backgroundColor: color.colour,
                                                border:
                                                    color.colour === "#FFFFFF"
                                                        ? "1px solid #ccc"
                                                        : "none",
                                            }}
                                        >
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                                {color.name}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {att.value.map((val) => (
                                    <li
                                        key={`${att.attribute.key}-${val.id || val.value
                                            }`}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            id={`${att.attribute.key}-${val.id || val.name}`}
                                            type="checkbox"
                                            value={val.name || val.value || ""}
                                            checked={!!selectedAttributes[att.attribute.key]?.some(
                                                (item) => item.value === val.value
                                            )}
                                            onChange={() =>
                                                handleAttributeChange(att.attribute.key, val.value, val.name)
                                            }
                                            className="w-4 h-4"
                                        />

                                        <label
                                            htmlFor={`${att.attribute.key}-${val.id || val.name
                                                }`}
                                            className="text-sm"
                                        >
                                            {val.name || val.value}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </React.Fragment>
            ))}

            {renderSection(
                "Brands",
                "brand",
                <ul className="flex flex-col gap-2">
                    {filterData?.brands?.map((brand) => (
                        <li
                            key={`brand-${brand.url}`}
                            className="flex items-center gap-2"
                        >
                            <input
                                id={brand.url}
                                type="checkbox"
                                checked={!!selectedAttributes["brand"]?.some(
                                    (item) => item.value === brand.url
                                )}
                                onChange={() =>
                                    handleAttributeChange("brand", brand.url, brand.name)
                                }
                                className="w-4 h-4"
                            />

                            <label
                                htmlFor={brand.url}
                                className="text-sm"
                            >
                                {brand.name}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    if (mobile) {
        return (
            <div
                className={`fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-50 transition-transform ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="bg-white w-3/4 h-full p-4 shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500"
                        onClick={() => setOpen(false)}
                    >
                        <X size={24} />
                    </button>
                    {content}
                </div>
            </div>
        );
    }

    return content;
};

export default FilterSidebar;