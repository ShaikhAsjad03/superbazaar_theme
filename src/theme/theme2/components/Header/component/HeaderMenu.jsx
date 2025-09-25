"use client";

import { useEffect, useRef, useState } from "react"
import { Search, User, ShoppingCart, Heart, Truck, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./MobileMenu"
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { getWebSetting } from "@/services/webSetting";
import { setWebSetting } from "@/store/slice/webSettingSlice";
import data from "@/data/MenuData";
import CurrencyComponent from "./CurrencyComponent";
import { signOut, useSession } from "next-auth/react";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { setWishlistData } from "@/store/slice/WishlistSlice";
import { getCartItems } from "@/services/cartService";
import { getUserWishlist } from "@/services/accountsService";
import { useRouter } from "next/navigation";
import { openCart } from "@/store/slice/MiniCartSlice";
import HeaderSearch from "./HeaderSearch";
import { setCategoyData } from "@/store/slice/categorySlice";

const HeaderMenu = ({ menudata, currencyData, webSetting }) => {
    const { data: session, } = useSession();
    const [openUser, setOpenUser] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const router = useRouter();
    const userRef = useRef(null)
    const [isSticky, setIsSticky] = useState(false);
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const { list } = useSelector((state) => state.wishlist);
    const cartData = useSelector((state) => state.cartItem.CartData.data);
    const handleCartClick = () => dispatch(openCart());

    const fetchProtectedData = async () => {
        const [wishlist, cartItems] = await Promise.all([
            getUserWishlist(),
            getCartItems(session?.user?.id),
        ]);
        dispatch(setWishlistData(wishlist.data));
        dispatch(setCartItems(cartItems));
    };

    useEffect(() => {
        if (session?.accessToken) {
            fetchProtectedData()
        }
        dispatch(setCategoyData(menudata))
    }, [session])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = async () => {
        localStorage.removeItem("token")
        signOut({ redirect: false })
        router.push("/")
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setOpenUser(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="w-full">
                <div className="z-[49] bg-black text-white text-center text-[12px] p-[11px] px-1.5">
                    FREE SHIPPING ON ORDER OVER ₹1000
                </div>

                <header className={`w-full bg-white transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-md z-50" : "relative"
                    }`}>
                    <div className="container mx-auto px-3">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center lg:hidden gap-4">
                                <div className="flex items-center lg:hidden gap-4">
                                    <button onClick={() => setOpenMenu(true)}>
                                        <Menu size={21} className="text-gray-800 mx-2 -mt-1" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 flex items-center">
                                <Link href="/">
                                    <Image
                                        src="/logo.png"
                                        alt="Superbazaar Logo"
                                        className=" object-contain"
                                        width={260}
                                        height={100}
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="flex-1 w-full md:w-1/2 lg:w-1/2 mx-0 lg:mx-6 my-2 lg:my-0">
                                <HeaderSearch open={showSearch} onClose={() => setShowSearch(false)} />
                            </div>

                            <div className="flex items-center space-x-4 text-gray-700 flex-shrink-0">
                                <Search
                                    className="cursor-pointer"
                                    size={20}
                                    onClick={() => setShowSearch((prev) => !prev)}
                                />

                                <CurrencyComponent currencyData={currencyData} />
                                <div className="hidden md:flex relative" ref={userRef}>
                                    <button onClick={() => { setOpenUser(!openUser) }} className="cursor-pointer">
                                        <User size={20} />
                                    </button>

                                    {openUser && (
                                        <div className="absolute right-[-10px] mt-6 w-40 bg-white shadow-lg rounded-lg z-50">
                                            {session?.accessToken ? (
                                                <>
                                                    <Link
                                                        href="/account/account-details"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        My Account
                                                    </Link>
                                                    <Link
                                                        href="/account/wishlist"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Wishlist
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        href="/login"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Login
                                                    </Link>
                                                    <Link
                                                        href="/signup"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Register
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {session?.accessToken && (
                                    <>
                                        <Link href="/account/wishlist">
                                            {list?.product?.length > 0 || list?.catalogue?.lemgth > 0 ?
                                                <Heart size={20}
                                                    className="cursor-pointer hidden md:flex text-red-500"
                                                    fill="currentColor" /> : <Heart size={20} className="cursor-pointer hidden md:flex" />}
                                        </Link>
                                        <div className="relative hidden md:flex">
                                            <ShoppingCart className="cursor-pointer" size={20} onClick={handleCartClick} />
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1" >
                                                {cartData?.length > 0 ? cartData?.length : 0}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                        <nav className="hidden lg:flex justify-center space-x-6 py-2 text-sm font-normal text-gray-800 relative mb-1">
                            {menudata.length > 0 && menudata.map((item) => (
                                <div key={item.id} className="relative group">
                                    <Link
                                        href={item.url === "wholesale" ? "/wholesale" : webSetting?.purchaseType === "wholesale" ? `/wholesale/${item.url}`
                                            : `/retail/${item.url}`}
                                        className="hover:text-red-800 flex items-center text-[17px] text-gray-700 tracking-normal"
                                    >
                                        {item.name}
                                    </Link>

                                    {item.children.length > 0 && (
                                        <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            <ul className="flex flex-col p-3 space-y-2">
                                                {item.children[0]?.children?.map((child) => (
                                                    <li key={child.id}>
                                                        <Link
                                                            href={item.url === "wholesale"
                                                                ? "/wholesale" : webSetting?.purchaseType === "wholesale"
                                                                    ? `/wholesale/${child.url}`
                                                                    : `/retail/${child.url}`}
                                                            className="block hover:text-red-800"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {menudata && menudata.length > 0 &&
                                <div>
                                    <Link
                                        href={webSetting?.purchaseType === "wholesale" ? `/brand` : `/brand`}
                                        className="hover:text-red-800 flex items-center text-[17px] text-gray-700 tracking-normal"
                                    >
                                        Brand
                                    </Link>
                                </div>}
                        </nav>
                    </div>
                </header>

                {openMenu && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setOpenMenu(false)}>
                        <MobileMenu webSetting={webSetting} data={data} closeMenu={() => setOpenMenu(false)} />
                    </div>
                )}
            </header >
            <MobileNav handleCartClick={handleCartClick} list={list} />
        </>
    );
};

export default HeaderMenu;