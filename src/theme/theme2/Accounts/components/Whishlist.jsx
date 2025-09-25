"use client"
import CatalogueCard from "@/components/cards/CatalogueCard"
import ProductCard from "@/components/cards/ProductCards"
import { Package, Shirt } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const WishlistTheme2 = () => {
  const { list } = useSelector((state) => state.wishlist)
  const [activeTab, setActiveTab] = useState("single")
  const products = list?.product || []
  const catalogues = list?.catalogue || []
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => {
            setActiveTab("full");
            router.push(`/catalogue/${category}`);
          }}
          className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "full" ? "bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-400"
            }`}
        >
          <Package size={18} />
          FULL SET
        </button>

        <button
          onClick={() => setActiveTab("single")}
          className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "single" ? "bg-red-700 text-white" : "bg-white hover:bg-gray-200"
            }`}
        >
          <Shirt size={18} />
          SINGLE
        </button>
      </div>

      {activeTab === "single" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((item, index) => <ProductCard key={index} data={item} />)
          ) : (
            <p className="text-gray-600">No products in your wishlist.</p>
          )}
        </div>
      )}

      {activeTab === "full" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalogues.length > 0 ? (
            catalogues.map((item, index) => (<CatalogueCard data={item} key={index} />))
          ) : (
            <p className="text-gray-600">No catalogues in your wishlist.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default WishlistTheme2