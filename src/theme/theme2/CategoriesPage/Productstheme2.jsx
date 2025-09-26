"use client";
import { useEffect, useRef, useState } from "react";
import { getCategoryFilter, getCategoryProducts } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ProductComponent/ProductCard";
import FilterSidebar from "./FilterSidebar";
import Pagination from "@/components/Pagination";
import cleanFilters from "@/helper/FilterClean";
import SelectedFilters from "@/components/SelctedFilter";
import ProductViewTabs from "../components/common/ProductViewTabs";
import ProductListToolbar from "../components/common/ProductListToolbar";

const Productstheme2 = ({ category, title }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [grid, setGrid] = useState(4);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("single");
    const [filterData, setFilterData] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const productSectionRef = useRef(null);

    const handlePageChange = (page) => {
        setPage(page);
        productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const buildFilterQuery = (selectedAttributes) => {
        const params = new URLSearchParams();
        Object.entries(selectedAttributes).forEach(([key, values]) => {
            const arr = Array.isArray(values) ? values : [];
            if (arr.length > 0) params.set(key, arr.map((v) => v.value).join(","));
        });
        return params.toString();
    };

    useEffect(() => {
        if (!searchParams) return;
        const paramsObj = {};
        for (const [key, value] of searchParams.entries()) {
            paramsObj[key] = value.split(",").map((v) => ({ value: v, label: v }));
        }
        setSelectedAttributes(paramsObj);
    }, [searchParams, category]);

    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
            const cleanFilter = cleanFilters(filters);
            const res = await getCategoryProducts(category, page, 20, sort, cleanFilter);
            setProducts(res.data || []);
            setTotalCount(res?.totalCount || 0);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sort]);

    useEffect(() => {
        const fetchFilter = async () => {
            const res = await getCategoryFilter(category);
            setFilterData(res.data || []);
        };
        fetchFilter();
    }, [category]);

    const handleApplyFilters = (filters) => fetchProducts(filters);

    return (
        <>
            <div className="container mx-auto px-4 mt-7">
                <ProductViewTabs
                    category={category}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <ProductListToolbar
                    title={title}
                    products={products}
                    totalCount={totalCount}
                    sort={sort}
                    setSort={setSort}
                    grid={grid}
                    setGrid={setGrid}
                    open={open}
                    setOpen={setOpen}
                />
                <FilterSidebar
                    open={open}
                    setOpen={setOpen}
                    filterData={filterData}
                    onApply={handleApplyFilters}
                    setSelectedAttributes={setSelectedAttributes}
                    selectedAttributes={selectedAttributes}
                    mobile={true}
                />

                <div className="flex flex-wrap">
                    <div className="hidden lg:block w-1/4 px-2">
                        <FilterSidebar
                            open={true}
                            filterData={filterData}
                            onApply={handleApplyFilters}
                            setSelectedAttributes={setSelectedAttributes}
                            selectedAttributes={selectedAttributes}
                            mobile={false}
                        />
                    </div>

                    <div className="w-full lg:w-3/4 px-2">
                        <SelectedFilters
                            selectedAttributes={selectedAttributes}
                            onFiltersChange={handleApplyFilters}
                            setSelectedAttributes={setSelectedAttributes}
                            fetchProducts={fetchProducts}
                        />

                        <div
                            className={`grid gap-4 ${grid === 2
                                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
                                : grid === 3
                                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                }`}
                        >
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    pathname={`${pathname}/${product?.url || "/"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center my-4">
                <Pagination
                    currentPage={page}
                    totalCount={totalCount}
                    perPage={20}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default Productstheme2;
