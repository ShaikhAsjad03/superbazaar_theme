"use client"
import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Breadcrum from "../components/BreadCrums/Breadcrum";
import { getPageBanners } from "@/services/productService";

const PageBannertheme2 = ({ url }) => {
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
    <div>
      <div className="relative w-full h-[300px]">
        {banner.desktopImage && (
          <Image
            src={ImageUrl(banner.desktopImage)}
            alt="Banner Desktop"
            fill
            className={`object-cover hidden md:block `}
          />
        )}
        {banner.mobileImage && (
          <Image
            src={ImageUrl(banner.mobileImage)}
            alt="Banner Mobile"
            fill
            className="object-cover md:hidden"

          />
        )}
      </div>
    </div>
  );
};

export default PageBannertheme2;
