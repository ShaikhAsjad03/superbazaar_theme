"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Columns2, Columns3, Columns4 } from "lucide-react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getBrandCatalogueListing } from "@/services/brandService";
import CatalogCard from "../ProductDetail/wholesale/component/CatalogCard";
const Pagination = dynamic(() => import("@/components/Pagination"))

const BrandCatalogueList = ({ brands, }) => {
    const [grid, setGrid] = useState(4);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const payload = {
                url: brands,
                perPage: 20,
                pageNo: page,
                sortOption: sort
            }
            const res = await getBrandCatalogueListing(payload);
            setProducts(Array.isArray(res.data) ? res.data : []); // ✅ always array
            setTotalCount(res?.totalCount || 0);
        } catch (err) {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, [page, sort, brands]);



    const sortOptions = [
        { value: "", label: "New Arrivals" },
        { value: "AtoZ", label: "A To Z" },
        { value: "ZtoA", label: "Z To A" },
        { value: "low", label: "Price: Low to High" },
        { value: "high", label: "Price: High to Low" },
    ];
    const gridButtons = [
        { icon: Columns2, value: 2, label: "2 Grid" },
        { icon: Columns3, value: 3, label: "3 Grid" },
        { icon: Columns4, value: 4, label: "4 Grid" },
    ];

    return (
        <div className="mx-auto px-4 mt-7 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1320px]">
            <div className="flex flex-wrap justify-end items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {gridButtons.map((btn) => {
                            const Icon = btn.icon;
                            return (
                                <button
                                    key={btn.value}
                                    onClick={() => setGrid(btn.value)}
                                    className={`p-2 rounded ${grid === btn.value ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                >
                                    <Icon size={18} />
                                </button>
                            );
                        })}
                    </div>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm shadow-sm hover:shadow-md transition-all duration-200 bg-white w-auto"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div
                className={`grid gap-4 
            ${grid === 2 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2" : ""} 
            ${grid === 3 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : ""} 
            ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
            >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : Array.isArray(products) && products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index}>
                            <CatalogCard product={item} grid={grid} category={brands} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found.
                    </p>
                )}

            </div>

            <div className="flex justify-center items-center ">
                <Pagination
                    currentPage={page}
                    totalCount={totalCount}
                    perPage={20}
                    onPageChange={(p) => setPage(p)}
                />
            </div>
        </div>
    );
};

export default BrandCatalogueList;
