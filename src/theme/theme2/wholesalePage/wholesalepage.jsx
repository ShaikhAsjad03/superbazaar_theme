"use client"

import Pagination from "@/components/Pagination";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useEffect, useState } from "react";
import CategorySidebar from "./components/categorySidebar";
import CatalogCard from "../ProductDetail/wholesale/component/CatalogCard";
import ProductListToolbar from "../components/common/ProductListToolbar";
import { usePathname } from "next/navigation";
import { getAllCatalogue } from "@/services/catalogueService";

const WholeSalePage = ({ category }) => {
    const pathname = usePathname();
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

            let category = selectedCategory.length > 0 ? `&categories=${selectedCategory.join(",")}` : "";

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

    return (
        <div className="mx-auto px-4 mt-7 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1320px]">

            <ProductListToolbar
                title="Wholesale Product"
                products={data}
                totalCount={totalCount}
                sort={sort}
                setSort={setSort}
                grid={grid}
                setGrid={setGrid}
                open={open}
                setOpen={setOpen}
                pathname={pathname}
            />

            <div className={`grid gap-4 ${grid === 2 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2" : ""} ${grid === 3 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : ""} ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
            >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => {
                        const categoryUrl = item?.CatalogueCategory?.[0]?.category?.url || null;
                        return (
                            <div key={index}>
                                <CatalogCard product={item} grid={grid} category={categoryUrl} />
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

            <CategorySidebar
                onClose={() => setOpen(false)}
                onFilterChange={handleFilterChange}
                selectedcategory={selectedcategory}
                setselectedcategory={setselectedcategory}
                open={open}
            />
        </div>
    )
}
export default WholeSalePage