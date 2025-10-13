import { ImageUrl } from "@/helper/imageUrl";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
const Menu = ({ Menudata }) => {
  const { webSetting } = useSelector((state) => state.webSetting);
  const getMenuLink = (item) => {
    if (item.type === "CATEGORY") {
      return webSetting?.purchaseType === "wholesale"
        ? `/wholesale/${item.url}`
        : `/retail/${item.url}`;
    }
    if (item.type == "CUSTOM" || item.type == "STATIC") {
      return `/${item.url}`;
    }

    if (item.url === "wholesale") return "/wholesale";


  };

  return (
    <div className="justify-center items-center mt-3 hidden lg:flex">
      <ul className="flex direction-row gap-3">
        {Menudata &&
          Menudata.length > 0 &&
          Menudata.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                href={getMenuLink(item)}
                className="flex items-center gap-1 px-3 py-2 text-black-900 hover:text-red-400 font-normal transition-colors"
              >
                {item.label}
                {item?.children && item.children.length > 0 && (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180 mt-1"
                  />
                )}
              </Link>

              {item?.children && item.children.length > 0 && (
                <>
                  {!item.isMega && (
                    <div className="absolute left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white shadow-lg rounded-md mt-2 z-50 min-w-[200px]">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={
                                child.type === "BRAND"
                                  ? `/brand/${child.url || child.label.toLowerCase()}`
                                  : webSetting?.purchaseType === "wholesale"
                                    ? `/wholesale/${child.url || child.label.toLowerCase()}`
                                    : `/retail/${child.url || child.label.toLowerCase()}`
                              }
                              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-400 transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {item.isMega && (
  <div
   className="fixed left-1/2 -translate-x-1/2 top-[116px] bg-white shadow-lg border-t border-gray-200 
           mt-2 z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 
           transition-all duration-300"
style={{ width: "calc(100vw - 20px)", overflowX: "hidden" }}

  >
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-5 gap-5 p-6">
      {item.children.slice(0, 4).map((child) => (
        <div key={child.id}>
          <span className="font-bold mb-5 text-zinc-900 ">{child.label}</span>
          {child.children && child.children.length > 0 && (
            <ul className="mt-2">
              {child.children.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={
                      sub.type === "BRAND"
                        ? `/brand/${sub.url || sub.label.toLowerCase()}`
                        : webSetting?.purchaseType === "wholesale"
                        ? `/wholesale/${sub.url || sub.label.toLowerCase()}`
                        : `/retail/${sub.url || sub.label.toLowerCase()}`
                    }
                    className="block px-2 py-1 text-zinc-900 hover:text-red-400"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
<div className="hidden sm:flex flex-col gap-5">
                        {item.images?.map((img) => (
                          <div key={img.id} className="relative w-full h-full">
                            <Image
                              src={ImageUrl(img.image)}
                              alt={item.label}
                              fill
                              className="object-cover rounded-md shadow-sm"
                            />
                          </div>
                        ))}
                      </div>
    </div>
  </div>
)}




                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Menu;
