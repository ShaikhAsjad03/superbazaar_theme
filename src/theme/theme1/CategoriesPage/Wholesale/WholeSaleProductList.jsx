"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal, LayoutList, Grip, GripVertical } from "lucide-react";
import { getCategoryProducts, getWholeSaleProductslists } from "@/services/productService";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import CatalogueCard from "../../../../components/cards/CatalogueCard";
import { usePathname, useRouter } from "next/navigation";
import { getPageContent } from "@/services/pageService";
const ProductCard = dynamic(() => import("@/components/cards/ProductCards"))
const Pagination = dynamic(() => import("@/components/Pagination"))
const WholeSaleProductList = ({ category }) => {
    const pathname = usePathname();
    const router = useRouter();
  const [pageData,setPageData]=useState([])

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
              const pageData = await getPageContent(category)
                  setPageData(pageData)
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
  const fetchPageData = async () => {
    try {
      const res = await getPageContent(category);
      setPageData(res || []); 
    } catch (err) {
      console.error("Error fetching page content:", err);
      setPageData([]);
    }
  };

  fetchPageData();
}, [category]);




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


     const handlePurchaseChange = (type) => {
    if (type === "wholesale") router.push(`/wholesale/${category}`);
    else router.push(`/retail/${category}`);
  };
    return (
        <div className="mx-auto px-4 mt-10  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px] 
  2xl:max-w-[1320px]">

     <div className="flex justify-center mb-6 ">
          <div className="inline-flex border border-zinc-300 bg-white shadow-md rounded-full overflow-hidden">
            <label
              className={`bg-black text-white flex items-center gap-2 px-6 py-2 text-sm font-semibold cursor-pointer transition-all duration-300
                `}
            >
              <input
                type="radio"
                name="purchaseType"
                value="wholesale"
                checked={true}
                onChange={() => handlePurchaseChange("wholesale")}
                className="hidden"
              />
              <span
                className={`inline-block w-3 h-3 rounded-full border border-zinc-400 bg-white `}
              ></span>
              Wholesale
            </label>

            <label
              className={`text-zinc-700 hover:bg-zinc-100 shadow flex items-center gap-2 px-6 py-2 text-sm font-semibold cursor-pointer transition-all duration-300
                `}
            >
              <input
                type="radio"
                name="purchaseType"
                value="retail"
                checked={false}
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
                className={`grid gap-4 
            ${grid === 4 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""} 
            ${grid === 5 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : ""}`}
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

             {Array.isArray(pageData) && pageData.length > 0 && pageData.map((item, i) => (
          <div
            key={i}
            className="prose max-w-none mb-6 mt-20"
            dangerouslySetInnerHTML={{ __html: item.htmlContent }}
          />
        ))}
        </div>
    );
};

export default WholeSaleProductList;
