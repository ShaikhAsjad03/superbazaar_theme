"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal, LayoutList, Grip, GripVertical } from "lucide-react";
import { getCategoryFilter, getCategoryProducts } from "@/services/productService";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import cleanFilters from "@/helper/FilterClean";
import { usePathname } from "next/navigation";

import CatalogueCard from "@/components/cards/CatalogueCard";
import { useSelector } from "react-redux";
const Filtertheme1 = dynamic(() => import("./Filtertheme1"))
const ProductCard = dynamic(() => import("@/components/cards/ProductCards"))
const Pagination = dynamic(() => import("@/components/Pagination"))
const SelectedFilters = dynamic(() => import("@/components/SelctedFilter"))
const Productstheme1 = ({ category }) => {
    const pathname = usePathname();
    const { webSetting } = useSelector((state) => state.webSetting)
    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const productSectionRef = useRef(null);

    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const cleanFilter = cleanFilters(filters);
            const res = await getCategoryProducts(category, page, 20, sort, cleanFilter);
            setProducts(res.data || []);
            setTotalCount(res?.totalCount || 0);
        } catch (err) {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sort, category]);

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await getCategoryFilter(category);
            setFilterData(res.data || []);
        };
        fetchFilter();
    }, [category])

    const handleApplyFilters = (filters) => fetchProducts(filters);

    const handlePageChange = (page) => {
        setPage(page); 
        productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sortOptions = [
        { value: "", label: "New Arrivals" },
        { value: "AtoZ", label: "A To Z" },
        { value: "ZtoA", label: "Z To A" },
        { value: "low", label: "Price: Low to High" },
        { value: "high", label: "Price: High to Low" },
    ];
    const gridButtons = [
        { icon: LayoutList, value: 2, label: "2 Grid" },
        { icon: Grip, value: 3, label: "3 Grid" },
        { icon: GripVertical, value: 4, label: "4 Grid" },
    ];
    return (
        <>
            <div className="mx-auto px-4 mt-7  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px] 
  2xl:max-w-[1320px]">
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 px-3 py-1 border rounded-sm shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
                    >
                        <SlidersHorizontal size={18} />
                        Filter
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 bg-gray-50 p-2 rounded-lg shadow-sm">
                            {gridButtons.map((btn) => {
                                const Icon = btn.icon;
                                const isActive = grid === btn.value;
                                return (
                                    <button
                                        key={btn.value}
                                        onClick={() => setGrid(btn.value)}
                                        title={btn.label}
                                        className={`p-1 rounded transition-all ${isActive
                                            ? "bg-zinc-900 text-white shadow-md"
                                            : "text-zinc-900 hover:bg-blue-100"
                                            }`}
                                    >
                                        <Icon size={20} />
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

                <SelectedFilters
                    selectedAttributes={selectedAttributes}
                    onFiltersChange={handleApplyFilters}
                    setSelectedAttributes={setSelectedAttributes}
                    fetchProducts={fetchProducts}
                />

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
                                {webSetting?.purchaseType === "retail" ? (
                                    <ProductCard data={item} grid={grid} />
                                ) : (
                                    <CatalogueCard
                                        data={item}
                                        grid={grid}
                                        redirectUrl={`catalogue/${pathname?.split("/")?.[3]}`}
                                    />
                                )}
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
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Filtertheme1
                open={open}
                category={category}
                setOpen={setOpen}
                filterData={filterData}
                onApply={handleApplyFilters}
                setSelectedAttributes={setSelectedAttributes}
                selectedAttributes={selectedAttributes}
            />
        </>
    );
};

export default Productstheme1;