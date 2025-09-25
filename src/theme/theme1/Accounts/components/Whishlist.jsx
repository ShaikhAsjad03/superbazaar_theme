"use client"
import { useState } from "react"
import ProductCard from "../../../../components/cards/ProductCards"
import { useSelector } from "react-redux"
import CatalogueCard from "@/components/cards/CatalogueCard"

const WishlistTheme1 = () => {
  const { list } = useSelector((state) => state.wishlist)
  const [activeTab, setActiveTab] = useState("products")
  const products = list?.product || []
  const catalogues = list?.catalogue || []
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-2 px-4 font-medium ${activeTab === "products" ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("catalogues")}
          className={`pb-2 px-4 font-medium ${activeTab === "catalogues" ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
        >
          Catalogues
        </button>
      </div>

      {activeTab === "products" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((item, index) => <ProductCard key={index} data={item} />)
          ) : (
            <p className="text-gray-600">No products in your wishlist.</p>
          )}
        </div>
      )}

      {activeTab === "catalogues" && (
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

export default WishlistTheme1
