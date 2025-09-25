"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import WishlistButton from "./attribute/WishlistButton";

const ProductCard = ({ data, redirectUrl }) => {
    const pathname = usePathname();
    return (
        <div className="group relative w-full bg-white rounded-t-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-0 sm:p-2">
            <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] md:aspect-[3/4]">
                <Link
                    href={redirectUrl ? `/retail/${redirectUrl}/${data?.url}` : `${pathname}/${data?.url || "/"}`}>
                    <Image
                        src={data?.mediumImage?.[0] ? ImageUrl(data?.mediumImage?.[0]) : "/banner1.webp"}
                        alt={data?.name || "Product"}
                        fill
                        className="rounded-t-lg transition-opacity duration-300 group-hover:opacity-0"
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

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-zinc-900 text-base sm:text-sm">
                        <PriceConverter price={data?.offer_price} />
                    </span>

                    {data?.retail_discount !== 0 && (
                        <span className="text-gray-400 line-through text-sm sm:text-sm">
                            <PriceConverter price={data?.retail_price} />
                        </span>
                    )}

                    {data?.retail_discount !== 0 &&
                        data?.retail_price &&
                        data?.offer_price && (
                            <span className="inline-block bg-gray-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded-md">
                                {data?.retail_discount}% OFF
                            </span>
                        )}
                </div>

                {/* <div className="flex items-start sm:items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-red-600 font-normal text-base sm:text-md">
                        <PriceConverter price={data?.offer_price} />
                    </span>

                    {data?.retail_discount != 0 && (
                        <span className="text-gray-400 line-through text-sm sm:text-md font-medium">
                            <PriceConverter price={data?.retail_price} />
                        </span>
                    )}

                    {data?.retail_discount != 0 && data?.retail_price && data?.offer_price && (
                        <span className="hidden lg:block bg-red-100 text-red-700 font-normal text-xs sm:text-md px-2 py-0.5 rounded-md">
                            {data?.retail_discount}% OFF
                        </span>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default ProductCard
