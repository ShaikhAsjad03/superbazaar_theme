"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCurrency, loadSelectedCurrency } from "@/store/slice/CurrencySlice";
const CurrencyComponent = ({ currencyData }) => {
    const dispatch = useDispatch();
    const { selected } = useSelector((state) => state.currency);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (currencyData?.length) {
            dispatch(loadSelectedCurrency());
            if (!selected) {
                const inr = currencyData.find((c) => c.code === "INR") || currencyData[0];
                dispatch(setSelectedCurrency(inr));
            }
        }
    }, [currencyData, dispatch]);
    const handleSelect = (cur) => {
        dispatch(setSelectedCurrency(cur));
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center"
            >
                {selected && (
                    <Image
                        src={ImageUrl(selected.flag)}
                        alt={selected.code}
                        width={30}
                        height={30}
                        className="object-cover"
                    />
                )}
            </div>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <ul className="grid grid-cols-3 gap-2 p-3 max-h-64 overflow-y-auto">
                        {currencyData?.map((cur) => {
                            const isSelected = selected?.code === cur.code;
                            return (
                                <li
                                    key={cur.id}
                                    onClick={() => handleSelect(cur)}
                                    className={`flex flex-col items-center justify-start gap-1 cursor-pointer p-2 rounded-md
                    ${isSelected
                                            ? "bg-gray-200 border border-gray-400"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    <Image
                                        src={ImageUrl(cur.flag)}
                                        alt={cur.code}
                                        width={25}
                                        height={25}
                                        className="object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">{cur.symbol}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencyComponent;
