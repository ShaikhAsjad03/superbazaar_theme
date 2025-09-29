"use client"
import cleanFilters from "@/helper/FilterClean";
import { getCategoryFilter, getCategoryProducts } from "@/services/productService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SlidersHorizontal, LayoutList, Grip } from "lucide-react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/cards/ProductCards";
import { getBrandProducts } from "@/services/brandService";
import Filtertheme1 from "../CategoriesPage/Retail/Filtertheme1";
import SelectedFilters from "@/components/SelctedFilter";

const BrandRetailProductList=({ brand })=>{
     const pathname = usePathname();
      const router = useRouter();
      const { webSetting } = useSelector((state) => state.webSetting);
    
      const [grid, setGrid] = useState(4);
      const [open, setOpen] = useState(false);
      const [sort, setSort] = useState("");
      const [page, setPage] = useState(1);
      const [products, setProducts] = useState([]);
      const [totalCount, setTotalCount] = useState(0);
      const [selectedAttributes, setSelectedAttributes] = useState({});
      const [loading, setLoading] = useState(true);
      const [filterData, setFilterData] = useState([]);
      const [purchaseType, setPurchaseType] = useState("retail"); 
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
        const fetchFilter = async () => {
          const res = await getCategoryFilter(brand);
          setFilterData(res.data || []);
        };
        fetchFilter();
      }, [brand]);
    
      useEffect(() => {
        fetchProducts();
      }, [page, sort, brand]);
    
      const handleApplyFilters = (filters) => fetchProducts(filters);
      const handlePageChange = (page) => {
        setPage(page);
        productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
     
      const handlePurchaseChange = (type) => {
        if (type === "wholesale") router.push(`/brand/catalogue/${brand}`);
        else router.push(`/brand/retail/${brand}`);
      };
    
      const sortOptions = [
        { value: "", label: "New Arrivals" },
        { value: "AtoZ", label: "A To Z" },
        { value: "ZtoA", label: "Z To A" },
        { value: "low", label: "Price: Low to High" },
        { value: "high", label: "Price: High to Low" },
      ];
    
      const gridButtons = [
        { icon: LayoutList, value: 4, label: "4 Grid" },
        { icon: Grip, value: 5, label: "5 Grid" },
      ];
    
    return(
 <div className="mx-auto px-4 mt-7  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px] 
  2xl:max-w-[1320px]">

      <div className="flex justify-center mb-6 ">
          <div className="inline-flex border border-zinc-300 bg-white shadow-md rounded-full overflow-hidden">
            <label
              className={`text-zinc-700 hover:bg-zinc-100 flex items-center gap-2 px-6 py-2 text-sm font-semibold cursor-pointer transition-all duration-300
                `}
            >
              <input
                type="radio"
                name="purchaseType"
                value="wholesale"
                checked={false}
                onChange={() => handlePurchaseChange("wholesale")}
                className="hidden"
              />
              <span
                className={`inline-block w-3 h-3 rounded-full border border-zinc-400 bg-white `}
              ></span>
              Wholesale
            </label>

            <label
              className={`bg-black text-white shadow flex items-center gap-2 px-6 py-2 text-sm font-semibold cursor-pointer transition-all duration-300
                `}
            >
              <input
                type="radio"
                name="purchaseType"
                value="retail"
                checked={purchaseType === "retail"}
                onChange={() => handlePurchaseChange("retail")}
                className="hidden"
              />
              <span
                className={`inline-block w-3 h-3 rounded-full border border-zinc-400 bg-white `}
              ></span>
              Retail
            </label>
          </div>
        </div>
        
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                          <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 px-3 py-1 border rounded-sm shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
                          >
                            <SlidersHorizontal size={18} />
                            Filter
                          </button>

                          <div className="flex items-center gap-3">

                         
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
            </div>

             <hr className="my-4 border-zinc-300" />
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
                ) : products?.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index}>
                          {console.log(item)}
                             <ProductCard data={item} grid={grid} redirectUrl={item?.categories?.[0]?.category?.url}/>
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

            
      <Filtertheme1
        open={open}
        category={brand}
        setOpen={setOpen}
        filterData={filterData}
        onApply={handleApplyFilters}
        setSelectedAttributes={setSelectedAttributes}
        selectedAttributes={selectedAttributes}
      />
        </div>
    )
}
export default BrandRetailProductList