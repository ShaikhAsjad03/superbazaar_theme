"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import WishlistButton from "./attribute/WishlistButton";

const HomeProductCard = ({ data, redirectUrl }) => {
    const pathname = usePathname();

    return (
        <div className="group relative w-full  rounded-lg  transition-shadow duration-300 overflow-hidden">
                        <Link
                href={redirectUrl ? `/retail/${redirectUrl}/${data?.url}` : `${pathname}/${data?.url || "/"}`}>
                
                <div className="relative w-full">
                    {data?.mediumImage?.[0] ? (
                        <Image
                            src={ImageUrl(data.mediumImage[0])}
                            alt={data?.name || "Product"}
                            width={133}   
                            height={200}  
                            className="object-cover w-full h-auto rounded-t-lg transition-opacity duration-300 group-hover:opacity-0"
                        />
                    ) : (
                        <Image
                            src="/banner1.webp"
                            alt="Product"
                            width={133}
                            height={200}
                            className="object-cover w-full h-auto rounded-t-lg"
                        />
                    )}

                    {data?.mediumImage?.[1] && (
                        <Image
                            src={ImageUrl(data.mediumImage[1])}
                            alt={data?.name || "Product Hover"}
                            width={133}
                            height={200}
                            className="object-cover w-full h-auto rounded-t-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute top-0 left-0"
                        />
                    )}
                </div>
            </Link>
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <WishlistButton productId={data.id} type="product" />
            </div>
            <div className="p-2 sm:p-2">
                <Link href={`${pathname}/${data?.url || "/"}`}>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 hover:text-gray-900 line-clamp-1">
                        {data?.name || ""}
                    </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-zinc-900 text-base sm:text-sm font-medium">
                        <PriceConverter price={data?.offer_price} />
                    </span>

                    {data?.retail_discount !== 0 && (
                        <span className="text-gray-400 line-through text-sm">
                            <PriceConverter price={data?.retail_price} />
                        </span>
                    )}

                    {data?.retail_discount !== 0 &&
                        data?.retail_price &&
                        data?.offer_price && (
                            <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded-md">
                                {data?.retail_discount}% OFF
                            </span>
                        )}
                </div>
            </div>
        </div>
    )
}

export default HomeProductCard;
