"use client"
import CatalogueCard from "@/components/cards/CatalogueCard";
import Pagination from "@/components/Pagination";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { SlidersHorizontal, LayoutList, Grip, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import CategorySidebar from "./components/categorySidebar";
import { getAllCatalogue } from "@/services/catalogueService";

const WholeSalePage = () => {
    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedcategory, setselectedcategory] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const fetchData = async (page = 1, selectedCategory = []) => {
        try {
            setLoading(true);

            let category =
                selectedCategory.length > 0
                    ? `&categories=${selectedCategory.join(",")}`
                    : "";

            const response = await getAllCatalogue(page, category, null, sort);

            setData(response.data);
            setTotalCount(response.totalCount || 0);
            setPage(page);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData()
    }, [sort])


    const handlePageClick = (page) => {
        setCurrentPage(page);
        fetchData(page);
    };

    const handleFilterChange = (selected) => {
        setselectedcategory(selected)
        fetchData(1, selected);
        setTotalCount(1);
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

            <div
                className={`grid gap-4 mb-5
            ${grid === 2 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2" : ""} 
            ${grid === 3 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : ""} 
            ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
            >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : data?.length > 0 ? (
                    data.map((item, index) => {
                        const categoryUrl = item?.CatalogueCategory?.[0]?.category?.url ||
                            null;
                        return (
                            <div key={index}>
                                <CatalogueCard data={item} grid={grid} redirectUrl={`catalogue/${categoryUrl}`} />
                            </div>
                        )
                    })
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
                    onPageChange={handlePageClick}
                />
            </div>
            {open && (
                <CategorySidebar
                    onClose={() => setOpen(false)}
                    onFilterChange={handleFilterChange}
                    selectedcategory={selectedcategory}
                    setselectedcategory={setselectedcategory}
                    open={open}
                />
            )}
        </div>
    )
}
export default WholeSalePage