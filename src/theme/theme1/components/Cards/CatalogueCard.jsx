"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageUrl } from "@/helper/imageUrl"
import PriceConverter from "@/components/PriceConverter"
import WishlistButton from "./WishlistButton"
import QuickViewButton from "./QuickViewButton"
import CompareButton from "./CompareButton"
import Label from "@/components/Label"

const CatalogueCard = ({ data, redirectUrl }) => {
  const pathname = usePathname();

  return (
    <div className="group relative w-full bg-white rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1">
      <div className="relative w-full aspect-[4/6] overflow-hidden rounded-t-lg">
        <Link
          href={
            redirectUrl
              ? `/catalogue/${redirectUrl}/${data?.url}`
              : `${pathname}/${data?.url || "/"}`
          }
        >
          <Image
            src={data?.coverImage ? ImageUrl(data?.coverImage) : "/banner1.webp"}
            alt={data?.name || "Catalogue"}
            fill
            className="transition-transform duration-700 group-hover:scale-110 object-cover"
          />
        </Link>
        {data?.label && (
          <Label text={data.label} danger={data?.label === "Hot"} />
        )}

        <div className="absolute top-5 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <WishlistButton productId={data?.id} type="catalogue" loginMode="modal" />
          <QuickViewButton />
          <CompareButton />
        </div>

        {data?.no_of_product && (
          <div
            className="
    absolute bottom-3 right-2
    bg-gray-900 text-white text-xs
    w-10 h-10 flex items-center justify-center
    rounded-full shadow-md
    transition-all duration-300
    group-hover:bg-red-600
  "
          >
            {`${data.no_of_product}PCS`}
          </div>

        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="p-2 relative">
        {/* 👉 Label ab yahan place hoga */}


        <Link href={`${pathname}/${data?.url || "/"}`}>
          <h3 className="text-sm sm:text-base text-zinc-900 line-clamp-5">
            {data?.name || ""}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-zinc-900">
            <PriceConverter price={data?.offer_price} />
          </span>
          {data?.price && data?.offer_price < data?.price && (
            <span className="text-gray-400 line-through text-sm">
              <PriceConverter price={data?.price} />
            </span>
          )}
        </div>

        {/* Average Price */}
        {data?.average_price && (
          <p className="text-xs text-gray-500 mt-1">
            {`(₹${data.average_price} per piece)`}
          </p>
        )}
      </div>
    </div>
  )
}

export default CatalogueCard
