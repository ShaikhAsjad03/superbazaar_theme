"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
const Filtertheme2 = ({ open, setOpen }) => {
    const categories = ["Saree", "Salwar Kameez", "Kurti", "Lehenga"];
    const colors = ["Red", "Blue", "Green", "Black", "White"];
    const sizes = ["S", "M", "L", "XL"];
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div
                style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setOpen(false)} />
            <div
                className={`fixed top-0 left-0 h-full w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                    } flex flex-col`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Filter </h2>
                    <button
                        className="bg-blue-600 p-1 rounded text-white transition-transform duration-300 hover:rotate-90"
                        onClick={() => setOpen(false)}>
                        <X size={25} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Categories</h3>
                        {categories.map((cat) => (
                            <label key={cat} className="block">
                                <input type="checkbox" className="mr-2" />
                                {cat}
                            </label>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Colors</h3>
                        {colors.map((color) => (
                            <label key={color} className="block">
                                <input type="checkbox" className="mr-2" />
                                {color}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Sizes</h3>
                        {sizes.map((size) => (
                            <label key={size} className="block">
                                <input type="checkbox" className="mr-2" />
                                {size}
                            </label>
                        ))}
                    </div>

                    <button
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setOpen(false)}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default Filtertheme2;
