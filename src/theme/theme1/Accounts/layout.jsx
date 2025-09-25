"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Package, Heart, LogOut } from "lucide-react";
const AccountsLayoutTheme1 = ({ children }) => {
  const pathname = usePathname();
  const tabs = [
    { name: "Account Details", href: "/account/account-details", icon: User },
    { name: "Address", href: "/account/address", icon: MapPin },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    {
      name: "Logout",
      onClick: () => signOut({ callbackUrl: "/" }),
      icon: LogOut
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-7 md:flex">
      <ul className="flex flex-col space-y-3 text-base font-medium md:me-6 mb-6 md:mb-0 w-60">
        {tabs.map((tab) => {
          const isActive = tab.href && pathname === tab.href;

          if (tab.onClick) {
            return (
              <li key={tab.name}>
                <button
                  onClick={tab.onClick}
                  className="group inline-flex items-center px-3 py-3 w-full rounded-lg border-b text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                >
                  {tab.icon && <tab.icon className="w-5 h-5 me-3" />}
                  {tab.name}
                </button>
              </li>
            );
          }

          return (
            <li key={tab.name}>
              <Link
                href={tab.href}
                className={`group inline-flex items-center px-3 py-3 w-full rounded-lg border-b ${isActive
                  ? "text-white bg-zinc-900 border-zinc-900 font-normal"
                  : "text-zinc-900 border-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                  }`}
              >
                {tab.icon && <tab.icon className="w-5 h-5 me-3" />}
                {tab.name}
              </Link>
            </li>
          );
        })}


      </ul>
      <div className="p-6 shadow-lg rounded-xl w-full bg-white">
        {children}
      </div>
    </div>
  );
};

export default AccountsLayoutTheme1;
