import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const MobileMenu = ({ open, handleMenu, Menudata }) => {
  const { webSetting } = useSelector((state) => state.webSetting);
  const [expanded, setExpanded] = useState({});

  const toggleSubMenu = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getMenuLink = (item) => {
    if (!item) return "#";

    if (item.type === "CATEGORY") {
      return webSetting?.purchaseType === "wholesale"
        ? `/wholesale/${item.url}`
        : `/retail/${item.url}`;
    }

    if (item.type === "CUSTOM" || item.type === "STATIC") {
      return `/${item.url}`;
    }

    if (item.type === "BRAND") {
      return `/brand/${item.url || item.label.toLowerCase()}`;
    }

    if (item.url === "wholesale") return "/wholesale";

    return `/${item.url}`;
  };

  const renderChildren = (children) => {
    if (!children || children.length === 0) return null;

    return (
      <ul className="pl-6 border-l border-gray-200">
        {children.map((child) => (
          <li key={child.id} className="py-2">
            <Link
              href={getMenuLink(child)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-400 transition-colors"
              onClick={handleMenu}
            >
              {child.label}
            </Link>
            {child.children && child.children.length > 0 && renderChildren(child.children)}
          </li>
        ))}
      </ul>
    );
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-72 h-screen bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto">
      <div className="flex justify-between items-center px-5 py-4 border-b bg-white shadow-md sticky top-0 z-10">
        <Image src="/logo.png" alt="Logo" width={150} height={150} className="h-10 w-auto" />
        <div
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 shadow cursor-pointer transition-all duration-300"
          onClick={handleMenu}
        >
          <X size={24} className="text-gray-600" />
        </div>
      </div>

      <ul className="py-3">
        {Menudata.map((item) => (
          <li key={item.id} className="px-4 py-2">
            <div className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-50 transition">
              <Link
                href={getMenuLink(item)}
                className="font-medium text-gray-900 hover:text-red-500 transition-colors"
                onClick={handleMenu}
              >
                {item.label}
              </Link>

              {item.children && item.children.length > 0 && (
                <button
                  onClick={() => toggleSubMenu(item.id)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200 transition"
                >
                  {expanded[item.id] ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              )}
            </div>

            {item.children && item.children.length > 0 && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded[item.id] ? "max-h-96 mt-2" : "max-h-0"
                  }`}
              >
                {renderChildren(item.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
