"use client";
import Image from "next/image";
import Link from "next/link";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import WishlistButton from "@/components/cards/attribute/WishlistButton";
import shouldShowPrice from "@/helper/shouldShowPrice";
import { useSession } from "next-auth/react";

const ProductCard = ({ product, pathname, webSetting }) => {
    if (!product) return null;
    const { data: session } = useSession();
    return (
        <div className="single-product-card bg-white rounded-md shadow hover:shadow-lg transition">
            <div className="product-image relative overflow-hidden">
                <Link
                    href={`${pathname}`}
                    className="product-img hover-image-container block relative group"
                >
                    <Image
                        src={ImageUrl(product?.mediumImage?.[0])}
                        alt={product?.name || "Product"}
                        title={product?.name || "Product"}
                        width={274}
                        height={480}
                        className="w-full object-cover bg-gray-100 transition duration-300"
                        loading="eager"
                        priority
                    />
                    {product?.mediumImage?.[1] && (
                        <Image
                            src={ImageUrl(product?.mediumImage?.[1])}
                            alt={product?.name || "Product"}
                            title={product?.name || "Product"}
                            width={274}
                            height={480}
                            className="hover-image w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
                            loading="eager"
                        />
                    )}

                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishlistButton productId={product.id} type="product" variant="detail" loginMode="page" />
                    </div>
                </Link>
            </div>

            <div className="product-details text-start mt-2 p-2">
                <div className="product-name font-semibold mb-1">
                    <Link
                        href={`${pathname}`}
                        className="text-gray-800 hover:text-amber-700 transition text-xs sm:text-sm md:text-base"
                    >
                        <span className="line-clamp-1 text-sm">
                            {product?.name}
                        </span>
                    </Link>
                </div>
                {shouldShowPrice(session?.accessToken, webSetting) ? (
                    <div className="product-price flex justify-between items-center gap-2">
                        <span className="price text-red-600 font-bold text-xs">
                            <PriceConverter price={product?.offer_price} />
                        </span>
                    </div>
                ) : (
                    <Link href="/login"
                        className="text-red-600 font-bold text-center text-xs cursor-pointer"
                    >
                        Login To View Price
                    </Link>
                )}

                {/* {shouldShowPrice(session?.accessToken, webSetting?.showPrice) ? (
                    <div className="product-price flex justify-between items-center gap-2">
                        <span className="price text-red-600 font-bold text-xs">
                            <PriceConverter price={product?.offer_price} />
                        </span>
                    </div>
                ) : (
                    <Link href="/login"
                        className="text-red-600 font-bold text-center text-xs cursor-pointer"
                    >
                        Login To View Price
                    </Link>
                )} */}
            </div>
        </div>
    );
};

export default ProductCard;
