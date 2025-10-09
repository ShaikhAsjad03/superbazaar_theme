"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import { getPageBanners } from "@/services/productService";
import Breadcrum from "@/theme/theme2/components/BreadCrums/Breadcrum";

const PageBannertheme1 = ({ url }) => {
  const [banner, setBanner] = useState(null);
  const [pageName, setPageName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const res = await getPageBanners(url);
      setBanner(res?.pagewiseBanner?.[0] || null);
      setPageName(res?.label || null);
    };
    fetchData();
  }, [url]);

  if (!banner) {
    return <Breadcrum name={pageName} />;
  }

  const safeDescription = banner?.description
    ? banner.description.replace(/<[^>]*>/g, "")
    : "Check out our latest collection of trendy outfits and accessories!";

  return (
    <div className="relative w-full h-[300px]">
      {banner.desktopImage && (
        <div className="hidden md:block w-full h-full">
          <Image
            src={ImageUrl(banner.desktopImage)}
            alt={banner?.title || "Page Banner"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {banner.mobileImage && (
        <div className="block md:hidden w-full h-full">
          <Image
            src={ImageUrl(banner.mobileImage)}
            alt={banner?.title || "Page Banner"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* <div className="hidden md:flex absolute inset-0 flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-2">
          {banner?.title || "New Arrivals"}
        </h1>
        <p className="text-lg max-w-xl text-white [&_*]:!text-white">
          {safeDescription}
        </p>
      </div> */}
    </div>
  );
};

export default PageBannertheme1;
