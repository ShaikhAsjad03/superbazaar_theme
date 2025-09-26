"use client";
import Link from "next/link";
import Image from "next/image";
import PriceConverter from "@/components/PriceConverter";
import { ImageUrl } from "@/helper/imageUrl";
import { Eye } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";

export default function CatalogueImages({
  selectedSize,
  catalogDetails,
  status,
  brandpath,
  category,
}) {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      Thumbs: {
        autoStart: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <div className="w-full px-2">
      <div className="relative mb-3 md:mb-0">
        <div className="w-full">
          <div className="p-0 mb-2.5">
            <div className="flex flex-wrap -mx-2">
              {catalogDetails?.Product?.map((item, index) => {
                const matchedSize = item.sizes.find((size) => size.size_id === selectedSize?.id);
                const hasQuantity = matchedSize?.quantity > 0;
                return (
                  <div className="w-1/2 px-2 mb-3" key={index}>
                    <div
                      className={`relative ${status === "loading" ? "animate-pulse" : ""
                        }`}
                    >
                      <Link href={ImageUrl(item?.image)} data-fancybox="gallery">
                        <Image
                          src={ImageUrl(item?.image)}
                          alt="product"
                          width={500}
                          height={500}
                          className={`w-full h-auto object-cover transition ${!hasQuantity && selectedSize
                            ? "blur-sm opacity-60" : ""}`} priority
                        />
                      </Link>

                      {!hasQuantity && selectedSize && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-5 py-2.5 rounded-lg font-bold text-gray-800 text-center text-sm z-20">
                          Not Available in This Size
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-[12px] uppercase text-xs font-medium bg-red-50 p-2">
                        {item?.average_price && (
                          <span className="whitespace-normal">
                            Price: <PriceConverter price={item?.average_price} />
                          </span>
                        )}
                        <span className="whitespace-nowrap text-xs">SKU: {item.sku}</span>
                      </div>

                      <div className="text-center">
                        <Link
                          href={
                            brandpath === "brands"
                              ? `/brands/retail/${category}/${item.url}`
                              : `/retail/${category}/${item.url}`
                          }
                        >
                          <button
                            className="w-full text-[13px] uppercase bg-black hover:bg-red-300 text-white font-medium py-2 px-4 mt-0 rounded-none transition duration-200 "
                          >
                            View Single
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
