"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Columns2, Columns3, Columns4 } from "lucide-react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {  getBrandProducts } from "@/services/brandService";
import ProductCard from "../ProductComponent/ProductCard";
import cleanFilters from "@/helper/FilterClean";
import ProductViewTabs from "../components/common/ProductViewTabs";
import FilterSidebar from "../CategoriesPage/FilterSidebar";
import ProductListToolbar from "../components/common/ProductListToolbar";
const Pagination = dynamic(() => import("@/components/Pagination"))

const BrandRetailProductList = ({ brand, }) => {
    const [grid, setGrid] = useState(4);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("single")
    const [open, setOpen] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const productSectionRef = useRef(null);
    
 const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
          const cleanFilter = cleanFilters(filters);
          const res = await getBrandProducts(brand, page, 20, sort, cleanFilter);
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
    }, [page, sort, brand]);

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
  const handleApplyFilters = (filters) => fetchProducts(filters);
  return (
    <>
       <div className="container mx-auto px-4 mt-7">
                <ProductViewTabs
                    category={brand}
                    activeTab={activeTab}
          setActiveTab={setActiveTab}
          brand="brand"
        />
         <ProductListToolbar
                    title={brand}
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

        <div className="mx-auto px-4 mt-7 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1320px]">           
                          <div
                            className={`grid gap-4 ${grid === 2
                                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"
                                : grid === 3
                                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                }`}
                        >
                {loading ? (
                    [...Array(grid * 2)].map((_, i) => <ProductCardSkeleton key={i} />)
                ) : Array.isArray(products) && products.length > 0 ? (
                    products.map((item, index) => (
                      <div key={index}>
                           <ProductCard product={item} pathname={item.url} />
                            {/* <CatalogCard product={item} grid={grid} category={brands} /> */}
                            {/* <CatalogCard product={item} grid={grid} category={brands} /> */}
                            {/* <CatalogCard product={item} grid={grid} category={brands} /> */}
                            {/* <CatalogCard product={item} grid={grid} category={brands} /> */}
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
      </div>
      </>
    );
};

export default BrandRetailProductList;
