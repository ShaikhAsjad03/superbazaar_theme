"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageUrl } from "@/helper/imageUrl"
import PriceConverter from "@/components/PriceConverter"
import Label from "@/components/Label"
import WishlistButton from "./attribute/WishlistButton"
import QuickViewButton from "./attribute/QuickViewButton"

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
          <QuickViewButton />
        </div>

        {data?.no_of_product && (
          <div className="bg-gray-800 text-white absolute bottom-1 text-xs w-10 h-10 flex md:hidden items-center justify-center rounded-full">
            {`${data.no_of_product}PCS`}
          </div>
        )}
      </div>

      <div className="p-2 relative">
        <Link href={`${pathname}/${data?.url || "/"}`}>
          <h3 className="text-sm text-gray-800 hover:text-gray-900 line-clamp-1 overflow-hidden">
            {data?.name || ""}
          </h3>
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
          <div className="flex flex-col items-center sm:items-start">
            {data?.average_price && (
              <p className="text-sm sm:text-base text-zinc-900 mt-1">
                <PriceConverter price={data?.average_price} />
              </p>
            )}
            <span className="text-zinc-900 text-sm">Avg Price</span>
          </div>

          {data?.no_of_product && (
            <div className="bg-gray-800 text-white text-xs w-10 h-10 hidden md:flex items-center justify-center rounded-full mx-auto sm:mx-0">
              {`${data.no_of_product}PCS`}
            </div>
          )}
          <div className="flex flex-col items-center sm:items-end">
            <span className="text-zinc-900">
              <PriceConverter price={data?.offer_price} />
            </span>
            {data?.price && data?.offer_price < data?.price && (
              <span className="text-zinc-900 line-through text-sm">
                <PriceConverter price={data?.price} />
              </span>
            )}
            <span className="text-zinc-900 text-sm">Full Price</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard
