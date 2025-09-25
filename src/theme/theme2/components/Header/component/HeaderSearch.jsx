"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Search, Mic, MicOff, X, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";

export default function HeaderSearch({ open, onClose, menuData = [] }) {
    const BaseURL = process.env.NEXT_PUBLIC_API_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [results, setResults] = useState({ products: [], catalogues: [] });
    const [suggestions, setSuggestions] = useState([]);

    const router = useRouter();
    const inputRef = useRef(null);

    const { isListening, handleVoiceSearch } = useVoiceSearch({
        onResult: (transcript) => {
            setSearchTerm(transcript);
            router.push(`/search?search=${encodeURIComponent(transcript)}`);
            setShowSuggestions(false);
            onClose && onClose();
        },
    });

    const placeholderTexts =
        menuData.length > 0
            ? menuData.map((item) => `Search for ${item.name}`)
            : ["Search for products"];
    useEffect(() => {
        const current = placeholderTexts[index];
        const typingSpeed = 300;
        const deletingSpeed = 150;
        const pauseEnd = 300;

        let timeout;

        if (forward) {
            if (subIndex < current.length) {
                timeout = setTimeout(() => setSubIndex((v) => v + 1), typingSpeed);
            } else {
                timeout = setTimeout(() => setForward(false), pauseEnd);
            }
        } else {
            if (subIndex > 0) {
                timeout = setTimeout(() => setSubIndex((v) => v - 1), deletingSpeed);
            } else {
                setForward(true);
                setIndex((i) => (i + 1) % placeholderTexts.length);
            }
        }

        setPlaceholder(current.substring(0, subIndex));

        return () => clearTimeout(timeout);
    }, [subIndex, forward, index, placeholderTexts]);

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults({ products: [], catalogues: [] });
            setSuggestions([]);
            return;
        }

        const delayFetch = setTimeout(() => {
            axios
                .get(`${BaseURL}api/public/search-filter?q=${encodeURIComponent(searchTerm)}`)
                .then((res) => {
                    setResults({
                        products: res.data.products || [],
                        catalogues: res.data.catalogues || [],
                    });
                    setSuggestions(res.data.suggestions || []);
                })
                .catch(() => {
                    setResults({ products: [], catalogues: [] });
                    setSuggestions([]);
                });
        }, 300);

        return () => clearTimeout(delayFetch);
    }, [searchTerm, BaseURL]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
        setSearchTerm("");
        setShowSuggestions(false);
        onClose && onClose();
    };

    return (
        <div className="relative w-full">
            <div className="w-4/4 mx-auto text-start">
                {open ? <form
                    onSubmit={handleSubmit}
                    className="flex items-center w-3/4 rounded-md px-3 py-2 bg-red-50"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                        }}
                        className="w-full bg-transparent outline-none text-sm p-1.5"
                        autoComplete="off"
                    />

                    {searchTerm ? (
                        <X
                            size={18}
                            className="ml-2 text-gray-600 cursor-pointer"
                            onClick={() => setSearchTerm("")}
                        />
                    ) : (
                        <button
                            type="submit"
                            className="p-0 border-0 bg-transparent text-gray-600"
                            aria-label="Search"
                        >
                            <Search size={18} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className={`ml-2 ${isListening ? "animate-pulse text-red-500" : "text-gray-600"}`}
                        aria-label="Voice Search"
                    >
                        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                    </button>
                </form> :
                    <div className="hidden sm:flex justify-center">
                        <div className="flex items-center justify-center w-3/4 rounded-md px-3 py-2 border border-dashed border-slate-300 text-sm">
                            <Truck className="mr-2 h-4 w-4 text-red-800 animate-blink" />
                            <p className="text-red-800 animate-blink">Only Ready To Ship Products</p>
                        </div>
                    </div>

                }
            </div>
            {showSuggestions &&
                (results.catalogues.length > 0 ||
                    results.products.length > 0 ||
                    suggestions.length > 0) && (
                    <div
                        className="absolute w-full mt-2 bg-white border border-gray-200 shadow-md rounded-lg"
                        style={{ zIndex: 9999, maxHeight: "400px", overflowY: "auto" }}
                    >
                        {suggestions.length > 0 && (
                            <div className="p-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Related Keywords</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
                                            onClick={() => {
                                                setSearchTerm(s);
                                                router.push(`/search?search=${encodeURIComponent(s)}`);
                                                setShowSuggestions(false);
                                                onClose && onClose();
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.catalogues.length > 0 && (
                            <div className="p-3 border-b border-gray-100">
                                <h6 className="text-sm font-semibold text-gray-700 mb-2">Catalogues</h6>
                                <div className="space-y-2">
                                    {results.catalogues.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/catalogue/${cat?.categories?.[0]?.url}/${cat.url}`);
                                                setSearchTerm("");
                                                setShowSuggestions(false);
                                                onClose && onClose();
                                            }}
                                        >
                                            <div className="relative w-[50px] h-[70px] flex-shrink-0">
                                                <Image
                                                    src={ImageUrl(cat.coverImage)}
                                                    alt={cat.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                                                <p className="text-red-500 text-xs">Rs. {cat.offer_price?.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">Code: {cat.cat_code}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.products.length > 0 && (
                            <div className="p-3">
                                <h6 className="text-sm font-semibold text-gray-700 mb-2">Products</h6>
                                <div className="space-y-2">
                                    {results.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/retail/${product?.categories?.[0]?.url}/${product.url}`);
                                                setSearchTerm("");
                                                setShowSuggestions(false);
                                                onClose && onClose();
                                            }}
                                        >
                                            <div className="relative w-[50px] h-[70px] flex-shrink-0">
                                                <Image
                                                    src={ImageUrl(product.thumbImage?.[0])}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                <p className="text-red-500 text-xs">Rs. {product.offer_price?.toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
}