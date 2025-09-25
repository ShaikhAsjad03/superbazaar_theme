"use client";

import { useSelector } from "react-redux";
import { X } from "lucide-react";

const CategorySidebar = ({ onClose, onFilterChange, selectedcategory, setselectedcategory, open, pathname }) => {

  const { data } = useSelector((state) => state.categorystore) || {};
  const filtermenu = Array.isArray(data) ? data.filter((item) => item.url !== "wholesale") : [];
  const handleCheckboxChange = (url) => {
    const updatedSelected = selectedcategory.includes(url)
      ? selectedcategory.filter((item) => item !== url)
      : [...selectedcategory, url];
    setselectedcategory(updatedSelected);
    onFilterChange(updatedSelected);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[90%] sm:w-[20rem] lg:w-[25rem] bg-white shadow-2xl z-50 transform transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"
          } flex flex-col rounded-r-2xl`}
        onClick={(e) => e.stopPropagation()}>

        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-semibold">Filters</h5>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>
        {filtermenu.length > 0 ? (
          <div className="space-y-3 ml-10 mt-5">
            {filtermenu.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`filter-${index}`}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedcategory.includes(item.url)}
                    onChange={() => handleCheckboxChange(item.url)}
                  />
                  <label
                    htmlFor={`filter-${index}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {item.name}
                  </label>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No filters available</p>
        )}
      </div>
    </>
  );
}

export default CategorySidebar