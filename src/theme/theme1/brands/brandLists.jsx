"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { getBrandListing } from "@/services/brandService";
import { ImageUrl } from "@/helper/imageUrl";
import Pagination from "@/components/Pagination";

const BrandsList = () => {
  const [data, setData] = useState({ data: [], totalCount: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getBrandListing(perPage, currentPage, debouncedSearch);
      setData(response);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearch]);

  const handleClear = () => setSearchTerm("");
  const handlePageClick = (page) => {
    const totalPages = Math.ceil(data?.totalCount / perPage);
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="px-4 md:px-10 py-6">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">|</span>
        <span className="text-gray-700 font-semibold">Brands</span>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center max-w-md mx-auto mb-8 bg-white border rounded-md shadow-sm px-4 py-2"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search brand..."
          className="w-full outline-none text-sm bg-transparent"
        />
        {searchTerm ? (
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={18}
            onClick={handleClear}
          />
        ) : (
          <Search className="text-gray-400" size={18} />
        )}
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading ? (
          Array.from({ length: perPage }).map((_, i) => (
            <div
              key={i}
              className="w-full h-28 bg-gray-200 animate-pulse rounded-xl"
            />
          ))
        ) : data?.data?.length > 0 ? (
          data?.data?.map((brand, id) => {
            const imageUrl = brand?.image ? ImageUrl(brand?.image) : null;
            return (
              <div
                key={id}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                <Link
                  href={`/brand/catalogue/${brand.url}`}
                  className="flex flex-col items-center justify-between p-6 h-full">
                  <div className="flex items-center justify-center h-24 w-24 mb-4 rounded-md bg-white shadow-inner  border-1 border-gray-400  group-hover:scale-110 transition-transform duration-300">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={brand.name}
                        className="max-h-16 max-w-[80%] object-contain"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded-md" />
                    )}
                  </div>

                  <h6 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate w-full text-center">
                    {brand?.name || "Other"}
                  </h6>
                  <span className="mt-2 h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition" />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              </div>
            );

          })
        ) : (
          <h1 className="col-span-full text-center text-gray-500">Brands Not Found</h1>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={data?.totalCount}
          perPage={perPage}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default BrandsList;
