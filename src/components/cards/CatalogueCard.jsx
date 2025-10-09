"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageUrl } from "@/helper/imageUrl"
import PriceConverter from "@/components/PriceConverter"
import Label from "@/components/Label"
import WishlistButton from "./attribute/WishlistButton"
import QuickViewButton from "./attribute/QuickViewButton"
import CataloguePriceVisibility from "../CataloguePriceVisibility"

const CatalogueCard = ({ data, redirectUrl }) => {
  const pathname = usePathname();
  return (
    <div className="group relative w-full bg-white rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1">
      <div className="relative w-full aspect-[4/6] overflow-hidden rounded-t-lg">
        <Link
          href={redirectUrl ? `/${redirectUrl}/${data?.url}` : `${pathname}/${data?.url || "/"}`}
        >
          <Image
            src={data?.coverImage ? ImageUrl(data?.coverImage) : "/banner1.webp"}
            alt={data?.name || "Catalogue"}
            fill
            className="transition-transform duration-700 group-hover:scale-110 object-cover mt-2"
          />
        </Link>

        {data?.label && (
          <Label text={data.label} danger={data?.label === "Hot"} />
        )}

        <div className="absolute top-5 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <WishlistButton catalogueId={data?.id} type="catalogue" variant="card" />
        </div>

        {data?.no_of_product && (
          <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-[10px] sm:text-xs w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-md">
            {`${data.no_of_product}PCS`}
          </div>
        )}
      </div>

      <div className="p-1 sm:p-2 relative">
        <Link href={`${pathname}/${data?.url || "/"}`}>
          <h3 className="text-sm text-gray-800 hover:text-gray-900 line-clamp-1 overflow-hidden">
            {data?.name || ""}
          </h3>
        </Link>

<CataloguePriceVisibility
  avgPrice={data?.average_price}
  offerPrice={data?.offer_price}
  fullPrice={data?.price}
  discount={data?.retail_discount}
/>
      </div>
    </div>
  )
}

export default CatalogueCard
