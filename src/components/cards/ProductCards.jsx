"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import WishlistButton from "./attribute/WishlistButton";
import PriceVisibilityProduct from "../PriceVisibilityProduct";
const ProductCard = ({ data, redirectUrl }) => {
  const pathname = usePathname();
  return (
    <div className="group relative w-full bg-white rounded-t-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-0 sm:p-2">
      <div className="relative w-full aspect-[4/6] sm:aspect-[1/1] md:aspect-[2/3]">
        <Link
          href={redirectUrl ? `/retail/${redirectUrl}/${data?.url}` : `${pathname}/${data?.url || "/"}`}
          className="group"
        >
          <Image
            src={data?.mediumImage?.[0] ? ImageUrl(data?.mediumImage?.[0]) : "/banner1.webp"}
            alt={data?.name || "Product"}
            fill
            className={`rounded-t-lg transition-opacity duration-300 ${data?.mediumImage?.[1] ? "group-hover:opacity-0" : ""
              }`}
          />
          {data?.mediumImage?.[1] && (
            <Image
              src={ImageUrl(data?.mediumImage[1])}
              alt={data?.name || "Product Hover"}
              fill
              className="rounded-t-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>


        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistButton productId={data.id} type="product" />
        </div>
      </div>

      <div className="mt-4">
        <Link href={`${pathname}/${data?.url || "/"}`}>
          <h3 className="text-sm sm:text-base font-normal text-gray-800 hover:text-gray-900 line-clamp-2 overflow-hidden">
            <span className="line-clamp-1 text-sm">
              {data?.name || ""}
            </span>
          </h3>
        </Link>


        <PriceVisibilityProduct
          offerPrice={data?.offer_price}
          retailPrice={data?.retail_price}
          retailDiscount={data?.retail_discount}
        />
      </div>
    </div>
  )
}

export default ProductCard
