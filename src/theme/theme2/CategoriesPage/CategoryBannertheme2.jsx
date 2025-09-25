"use client"
import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Breadcrum from "../components/BreadCrums/Breadcrum";
import { getCategoryBanners } from "@/services/productService";

const CategoryBannertheme2 = ({ category }) => {
  const [banner, setBanner] = useState(null);
  const [pageName, setPageName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryBanners(category);
      setBanner(res?.PageWiseBanner?.[0] || null);
      setPageName(res?.name || null);
    };
    fetchData();
  }, [category]);

  if (!banner) {
    return <Breadcrum name={pageName} />;
  }

  const safeDescription = banner?.description
    ? banner.description.replace(/<[^>]*>/g, "")
    : "Check out our latest collection of trendy outfits and accessories!";

  return (
    <div>
      <div className="relative ">
        {banner.desktopImage && (
          <Image
            src={ImageUrl(banner.desktopImage)}
            alt="Banner Desktop"
            width={1440}
            height={300}
            className={`object-cover hidden md:block `}
          />
        )}
        {banner.mobileImage && (
          <Image
            src={ImageUrl(banner.mobileImage)}
            alt="Banner Mobile"
            width={540}
            height={658}
            className="object-cover md:hidden"

          />
        )}
      </div>
    </div>
  );
};

export default CategoryBannertheme2;
