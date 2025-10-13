"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Grid, Box, Package } from "lucide-react";
import { getsearchData } from "@/services/searchService";
import CatalogueCard from "@/components/cards/CatalogueCard";
import ProductCard from "@/components/cards/ProductCards";

const tabsData = [
    { title: "All", url: "all", icon: Grid },
    { title: "Full Set", url: "fullSet", icon: Package },
    { title: "Single", url: "single", icon: Box },
];

const Search = () => {
    const [active, setActive] = useState("all");
    const [catalogues, setCatalogues] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";

    const fetchData = async () => {
        setLoading(true);
        try {
            const base_url = `search=${search}&tab=${active}`;
            const res = await getsearchData(base_url);
            if (res?.isSuccess) {
                setCatalogues(res.data.catalogues || []);
                setProducts(res.data.products || []);
            }
        } catch (err) {
            console.error("Error fetching search data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [active, search]);

   const renderCatalogues = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-b mb-5 border-gray-400">
    {catalogues.map((item, index) => {
      const redirectUrl = item?.CatalogueCategory?.find(
        (cat) => cat?.category?.menus?.length > 0 && cat.category.menus[0]?.url
      )?.category?.menus?.[0]?.url;

      return (
        <div key={index}>
          <CatalogueCard data={item} redirectUrl={`catalogue/${redirectUrl}`} />
        </div>
      );
    })}
  </div>
);

const renderProducts = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {products.map((item, index) => {
      const redirectUrl = item?.categories?.find(
        (cat) => cat?.category?.menus?.length > 0 && cat.category.menus[0]?.url
      )?.category?.menus?.[0]?.url;

      return (
        <div key={index}>
          <ProductCard data={item} redirectUrl={redirectUrl} />
        </div>
      );
    })}
  </div>
);

    return (
        <div
            className="mx-auto px-4 mt-10  
        w-full 
        sm:max-w-[540px] 
        md:max-w-[720px] 
        lg:max-w-[960px] 
        xl:max-w-[1240px] 
        2xl:max-w-[1320px]">
            <div className="w-full flex justify-center items-center mb-10">
                <div className="flex bg-gray-100 rounded-full p-1 shadow-md">
                    {tabsData.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.url}
                                onClick={() => setActive(tab.url)}
                                className={`relative flex items-center gap-2 px-6 py-2 text-sm sm:text-base md:text-lg font-medium rounded transition-all duration-300 
                  ${active === tab.url
                                        ? "bg-black text-white shadow-lg scale-105"
                                        : "text-gray-600 hover:text-black"
                                    }`}>
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                {tab.title}
                            </button>
                        );
                    })}
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : active === "all" ? (
                <>
                    {catalogues.length > 0 && renderCatalogues()}
                    {products.length > 0 && renderProducts()}
                    {catalogues.length === 0 && products.length === 0 && (
                        <div className="text-center text-gray-500">No results found.</div>
                    )}
                </>
            ) : active === "fullSet" ? (
                catalogues.length > 0 ? renderCatalogues() : (
                    <div className="text-center text-gray-500">No catalogues found.</div>
                )
            ) : active === "single" ? (
                products.length > 0 ? (
                    renderProducts()
                ) : (
                    <div className="text-center text-gray-500">No products found.</div>
                )
            ) : null}
        </div>
    );
};

export default Search;
