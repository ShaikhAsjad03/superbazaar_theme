import { ChevronDown } from "lucide-react";
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
    <div className="justify-center items-center mt-3 hidden sm:flex">
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
                    <div className="absolute left-0 top-full w-[600px] p-4 bg-white shadow-lg rounded-md mt-2 z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                      <div className="grid grid-cols-3 gap-4">
                        {item.children.map((child) => (
                          <div key={child.id}>
                            <h4 className="font-semibold mb-2">{child.label}</h4>
                            {child.children && child.children.length > 0 && (
                              <ul>
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
                                      className="block px-2 py-1 text-gray-600 hover:text-red-400"
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
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
