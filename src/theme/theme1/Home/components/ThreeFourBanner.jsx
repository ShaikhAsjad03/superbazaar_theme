"use client"
import { ImageUrl } from "@/helper/imageUrl"
import Image from "next/image"
const ThreeFourBanner = ({ data, bannergrid = 4, htmlContent,fullScreen }) => {
  return (
    <div 
    className={`${
    fullScreen
      ? "" 
      : "mx-auto px-4 mt-10 w-full sm:max-w-[680px] md:max-w-[980px] lg:max-w-[980px] xl:max-w-[1280px] 2xl:max-w-[1320px]"
  }`}
  >
      {data?.length > 0 ? (
        <div className={`grid ${bannergrid === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"}`}>
          {data?.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
            >
              <Image
                src={ImageUrl(item?.image)}
                alt={item?.title || "Banner"}
                width={400}
                height={400}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : htmlContent ? (
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : null}

    </div>
  )
}

export default ThreeFourBanner
