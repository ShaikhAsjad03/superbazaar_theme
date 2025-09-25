"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal, LayoutList, Grip, GripVertical } from "lucide-react";
import { getCategoryProducts, getWholeSaleProductslists } from "@/services/productService";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import CatalogueCard from "../../../../components/cards/CatalogueCard";
import { usePathname } from "next/navigation";
const ProductCard = dynamic(() => import("@/components/cards/ProductCards"))
const Pagination = dynamic(() => import("@/components/Pagination"))
const WholeSaleProductList = ({ category }) => {
    const pathname = usePathname();


    const [grid, setGrid] = useState(4);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getWholeSaleProductslists(category, page, 20, sort);
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
        <div className="mx-auto px-4 mt-10  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px] 
  2xl:max-w-[1320px]">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="hidden md:flex items-center gap-5">
                    {gridButtons.map((btn) => {
                        const Icon = btn.icon;
                        const isActive = grid === btn.value;
                        return (
                            <button
                                key={btn.value}
                                onClick={() => setGrid(btn.value)}
                                title={btn.label}
                                className={`p-2 rounded transition-all ${isActive
                                    ? "bg-zinc-900 text-white "
                                    : "text-zinc-900 hover:bg-zinc-900 hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-3">


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
                className={`grid gap-6 
            ${grid === 2 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2" : ""} 
            ${grid === 3 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : ""} 
            ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
            >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : products?.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index}>
                            <CatalogueCard data={item} grid={grid} redirectUrl={`catalogue/${pathname?.split("/")?.[2]}`} />
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

export default WholeSaleProductList;
