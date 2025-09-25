"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Key,
  UserPlus,
  MenuIcon,
  LogOut,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import { openCart } from "@/store/slice/MiniCartSlice";
import { useModal } from "@/hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyData } from "@/store/slice/CurrencySlice";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserWishlist } from "@/services/accountsService";
import { setWishlistData } from "@/store/slice/WishlistSlice";
import { getCartItems } from "@/services/cartService";
import { setCartItems } from "@/store/slice/cartItemSlice";
import CurrencySelector from "@/theme/theme1/Home/components/CurrencySelector";
import { setCategoyData } from "@/store/slice/categorySlice";
import SeachBar from "./searchBar";

const MobileMenu = dynamic(() => import("./MobileMenu"));

const NavbarClient = ({ Menudata, currencyData }) => {
  const router = useRouter();
  const { open } = useModal();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { list } = useSelector((state) => state.wishlist);
  const [token, setToken] = useState(null);

useEffect(() => {
  setToken(localStorage.getItem("token"));
}, []);

  const fetchProtectedData = async () => {
    const [wishlist, cartItems] = await Promise.all([
      getUserWishlist(),
      getCartItems(session?.user?.id),
    ]);
    dispatch(setWishlistData(wishlist.data));
    dispatch(setCartItems(cartItems));
  };

 useEffect(() => {
  if (session?.accessToken && token) {
    fetchProtectedData();
  }
  dispatch(setCategoyData(Menudata));
}, [session, token]);


  useEffect(() => {
    dispatch(setCurrencyData(currencyData));

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [currencyData]);

  const handleMenu = () => setMenuOpen(!menuOpen);
  const handleCartClick = () => dispatch(openCart());
  const handleLogout = async () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 relative">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="sm:hidden cursor-pointer">
            <MenuIcon className="w-6 h-6 text-gray-500 " onClick={handleMenu} />
          </div>
          <div className="hidden sm:flex">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={250}
                height={250}
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-3 relative">
          <div className="hidden sm:block">
            <SeachBar />
          </div>

          <div className="sm:hidden flex justify-center">
            <Image
              src="/logo.png"
              alt="Superbazaar Logo"
              className=" object-contain"
              width={260}
              height={100}
              priority
            />
          </div>
        </div>
        <div
          className="flex items-center gap-3 text-zinc-800 relative"
          ref={dropdownRef}
        >
          <CurrencySelector currencyData={currencyData} />
          <div className="sm:hidden">
            <Search
              className="cursor-pointer text-zinc-800 w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            />
          </div>

          {session?.accessToken && (
            <>
              {list?.product?.length > 0 || list?.catalogue?.length > 0 ? (
                <Link href={"/account/wishlist"}>
                  <Heart
                    className="fill-red-500 text-red-500 sm:block w-5 h-5 sm:w-6 sm:h-6"
                  />
                </Link>
              ) : (
                <Link href={"/account/wishlist"}>
                  <Heart className="cursor-pointer text-zinc-800 sm:block w-5 h-5 sm:w-6 sm:h-6"
                  />
                </Link>
              )}
              <ShoppingBag
                className="cursor-pointer text-zinc-800 hidden sm:block w-5 h-5 sm:w-6 sm:h-6"
                onClick={handleCartClick}
              />
            </>
          )}

          <div className="relative">
            <User
              className="cursor-pointer text-zinc-800 w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <ul className="py-2 text-sm text-gray-700">
                  {!session?.accessToken && (
                    <li
                      onClick={() => open("login")}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                    >
                      <Key
                        className="w-4 h-4 text-gray-500 group-hover:text-red-400"
                      />
                      <span className="font-medium">Login</span>
                    </li>
                  )}

                  <li
                    onClick={() => open("signup")}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                  >
                    <UserPlus
                      className="w-4 h-4 text-gray-500 group-hover:text-red-400"
                    />
                    <span className="font-medium">Sign Up</span>
                  </li>
                  <hr className="my-1 border-gray-200" />

                  {session?.accessToken && (
                    <>
                      <li>
                        <Link
                          href="/account/wishlist"
                          className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
                          <span className="font-medium">Wishlist</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/account/account-details"
                          className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                        >
                          <User className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
                          <span className="font-medium">Account</span>
                        </Link>
                      </li>
                      <li>
                        <div
                          onClick={handleLogout}
                          className="cursor-pointer flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                        >
                          <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-400" />
                          <span className="font-medium">Logout</span>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Menu Menudata={Menudata} />
      <MobileMenu open={menuOpen} handleMenu={handleMenu} Menudata={Menudata} />

      {mobileSearchOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md z-40 animate-slideDown px-2 py-2">
          <div className="w-full">
            <SeachBar className="w-full" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;
