"use client";
import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import PriceConverter from "@/components/PriceConverter";
const FilterContent = ({
  filterData,
  openSections,
  toggleSection,
  priceRange,
  setPriceRange,
  appliedPrice,
  setAppliedPrice,
  selectedAttributes,
  setSelectedAttributes,
  onApply,
  setOpenSections
}) => {

  useEffect(() => {
    if (!filterData) return;

    const sections = {};
    if (filterData.attributes) {
      filterData.attributes.forEach((attr) => (sections[attr.attribute.key] = true));
    }
    if (filterData.brands) sections["brand"] = true;
    if (filterData.priceRange) sections["price"] = true;
    setOpenSections(sections);

    const initAttributes = {};
    filterData.attributes?.forEach((attr) => (initAttributes[attr.attribute.key] = []));
    if (filterData.brands) initAttributes["brand"] = [];
    setSelectedAttributes(initAttributes);

    if (filterData.priceRange) {
      const { minPrice, maxPrice } = filterData.priceRange;
      setPriceRange([minPrice, maxPrice]);
    }
  }, [filterData]);
  const handleAttributeChange = (key, value, name) => {


    setSelectedAttributes((prev) => {
      const current = prev[key] || [];
      const exists = current.find((item) => item.value === value);
      const updated = exists
        ? current.filter((item) => item.value !== value)
        : [...current, { label: name, value }];

      const newAttributes = { ...prev, [key]: updated };
      if (onApply) onApply({ attributes: newAttributes, price: appliedPrice });

      return newAttributes;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto  space-y-4">
      {filterData?.priceRange && (
        <div className="p-4 border-b border-gray-300">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("price")}
          >
            <h3 className="font-semibold">Price</h3>
            {openSections["price"] ? <Minus /> : <Plus />}
          </div>
          {openSections["price"] && (
            <div className="mt-3 space-y-3">
              <Slider
                min={filterData?.priceRange?.minPrice || 0}
                max={filterData?.priceRange?.maxPrice || 1000}
                range
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                trackStyle={[{ backgroundColor: "#000", height: 6 }]}
                handleStyle={[
                  {
                    borderColor: "#000",
                    height: 18,
                    width: 18,
                    marginTop: -7,
                    backgroundColor: "#fff",
                  },
                  {
                    borderColor: "#000",
                    height: 18,
                    width: 18,
                    marginTop: -7,
                    backgroundColor: "#fff",
                  },
                ]}
                railStyle={{ backgroundColor: "#E5E7EB", height: 6 }}
              />


              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mt-2">
                <span className="text-sm font-medium">
                  Price:( <PriceConverter price={priceRange[0]} /> —{" "}
                  <PriceConverter price={priceRange[1]} />
                  )
                </span>
                <button
                  onClick={() => {
                    setAppliedPrice(priceRange);
                    if (onApply)
                      onApply({ attributes: selectedAttributes, price: priceRange });
                  }}
                  className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                >
                  Apply
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {filterData?.attributes && (
        <>
          {filterData.attributes
            .filter((attr) => attr.attribute.key.toLowerCase() === "color")
            .map((attr) => (
              <div
                key={attr.attribute.key}
                className="p-4 border-b border-gray-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(attr.attribute.key)}
                >
                  <h3 className="font-semibold">{attr.attribute.name}</h3>
                  {openSections[attr.attribute.key] ? <Minus /> : <Plus />}
                </div>
                {openSections[attr.attribute.key] && (
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {attr.value.map((val) => {
                      const isSelected = !!selectedAttributes[attr.attribute.key]?.some(
                        (item) => item.value === val.value
                      );

                      return (
                        <label
                          key={val.value}
                          className="cursor-pointer flex justify-center"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isSelected}
                            onChange={() =>
                              handleAttributeChange(
                                attr.attribute.key,
                                val.value,
                                val.name
                              )
                            }
                          />
                          <span
                            className={`w-7 h-7 rounded border ${isSelected
                                ? "ring-2 ring-blue-500"
                                : "border-gray-300"
                              }`}
                            style={{ backgroundColor: val.colour }}
                          />
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

          {filterData.attributes
            .filter((attr) => attr.attribute.key.toLowerCase() !== "color")
            .map((attr) => (
              <div
                key={attr.attribute.key}
                className="p-4 border-b border-gray-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(attr.attribute.key)}
                >
                  <h3 className="font-semibold">{attr.attribute.name}</h3>
                  {openSections[attr.attribute.key] ? <Minus /> : <Plus />}
                </div>
                {openSections[attr.attribute.key] && (
                  <div className="mt-3 space-y-3">
                    {attr.value.map((val) => {
                      const isSelected = !!selectedAttributes[
                        attr.attribute.key
                      ]?.some((item) => item.value === val.value);

                      return (
                        <label
                          key={val.value}
                          className="cursor-pointer flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="accent-black"
                            checked={isSelected}
                            onChange={() =>
                              handleAttributeChange(
                                attr.attribute.key,
                                val.value,
                                val.name
                              )
                            }
                          />
                          <span>{val.name}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
        </>
      )}

      {filterData?.brands && (
        <div className="p-4 border-b border-gray-300">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("brand")}
          >
            <h3 className="font-semibold">Brands</h3>
            {openSections["brand"] ? <Minus /> : <Plus />}
          </div>
          {openSections["brand"] && (
            <div className="mt-3 space-y-2">
              {filterData.brands.map((brand) => (
                <label
                  key={brand.name}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={
                      selectedAttributes["brand"]?.some(
                        (item) => item.value === brand.url
                      ) || false
                    }
                    onChange={() =>
                      handleAttributeChange("brand", brand.url, brand.name)
                    }
                  />
                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default FilterContent
