"use client"
import { useEffect, useMemo, useState } from "react"
import SizeSelector from "@/components/SizeSelector"
import CatalogueImages from "./components/catalogueimage"
import { Loader2, MessageCircle, Minus, Plus, } from "lucide-react";
import StaticImage from "@/components/StaticImage"
import RalatedCatalogue from "./components/realtedCatalogue"
import { useDispatch, useSelector } from "react-redux"
import { useSession } from "next-auth/react"
import { addToCartProduct, getCartItems } from "@/services/cartService"
import { setCartItems } from "@/store/slice/cartItemSlice"
import { openCart } from "@/store/slice/MiniCartSlice"
import SharePopup from "../single/components/SharePopup"
import PriceConverter from "@/components/PriceConverter"
import ProductAccordion from "../single/components/ProductAccordion"
import OfferBanner from "@/components/OfferBanner"
import Link from "next/link"
import WishlistButton from "@/components/cards/attribute/WishlistButton"
import DownloadImage from "../../components/common/DownloadImage"
import DownloadZip from "../../components/common/DownloadZip"
import { useRouter } from "next/navigation"
import { setWebSetting } from "@/store/slice/webSettingSlice";
import { getWebSetting } from "@/services/webSetting";
import shouldShowPrice from "@/helper/shouldShowPrice";

const Catalogue = ({ CatalogueDetailData, stitching, category }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { data: session, status } = useSession();
    const [errors, setErrors] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [shareOpen, setShareOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stitchingData, setStitchingData] = useState(null);
    const [wishlist, setWishlist] = useState(false);
    const [compare, setCompare] = useState(false);

    const webSetting = useSelector(state => state.webSetting.webSetting)

    const fetchData = async () => {
        const data = await getWebSetting();
        dispatch(setWebSetting(data));
    }

    useEffect(() => {
        fetchData();
    }, []);
    const [productPageURL, setProductPageURL] = useState("#");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProductPageURL(window.location.href);
        }
    }, []);

    const whatsappURL = useMemo(() => {
        if (!CatalogueDetailData) return "#";

        const message =
            `Hi, I want to inquire about this product:\n\n` +
            `🛍 Name: ${CatalogueDetailData.name}\n` +
            `💰 Price: ₹${CatalogueDetailData.offer_price}\n` +
            `🔗 View: ${productPageURL}`;

        return `https://api.whatsapp.com/send?phone=+917226813589&text=${encodeURIComponent(message)}`;
    }, [CatalogueDetailData]);

    const increment = () => {
        if (CatalogueDetailData.optionType === "Size" && !selectedSize) {
            return setErrors("⚠️ Please select size");
        }
        if (CatalogueDetailData.optionType === "Stitching") {
            if (!stitchingData || stitchingData.stitching.length === 0) {
                return setErrors("⚠️ Please select stitching option");
            }
            if (!stitchingData.isValid) {
                return setErrors("⚠️ Please fill all required measurements");
            }
        }
        setQuantity((prev) => prev + 1);
    };
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const toggleWishlist = () => setWishlist((prev) => !prev);
    const toggleCompare = () => setCompare((prev) => !prev);
    const brandUrl = CatalogueDetailData.CatalogueBrand[0]?.brand.url

    const handleAddtoCart = async () => {
        setErrors(null);
        if (!session?.accessToken) {
            router.push("/login");
            return;
        }
        if (CatalogueDetailData?.optionType === "Size" && Object.keys(selectedSize)?.length == 0) {
            return setErrors("⚠️ Please select size");
        }

        if (CatalogueDetailData?.optionType === "Stitching") {
            if (!stitchingData || stitchingData.stitching.length === 0) {
                return setErrors("⚠️ Please select stitching option");
            }
            if (!stitchingData.isValid) {
                return setErrors("⚠️ Please fill all required measurements");
            }
        }

        setLoading(true);
        try {
            const finalCartData = {
                catalogue_id: CatalogueDetailData.id,
                quantity: quantity,
                user_id: session?.user?.id,
                ...(CatalogueDetailData.optionType === "Size" && { size: selectedSize }),
                ...(CatalogueDetailData.optionType === "Stitching" && { stitching: stitchingData?.stitching || [] }),
            };

            const response = await addToCartProduct(finalCartData)
            if (response?.isSuccess) {
                const fetchCartData = await getCartItems(session?.user?.id)
                dispatch(setCartItems(fetchCartData))
                dispatch(openCart())
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 md:col-span-6">
                        <CatalogueImages catalogDetails={CatalogueDetailData} category={category} />
                    </div>

                    <div className="lg:col-span-5 md:col-span-6 lg:sticky lg:top-20 self-start">
                        <div className="">
                            <div className="mb-0">
                                <h3 className={status === "loading" ? "animate-pulse h-8 w-64 bg-gray-200 rounded"
                                    : "text-left mb-2"}>
                                    {CatalogueDetailData?.name}
                                </h3>

                                <h6
                                    className={`text-gray-700 ${status === "loading" ? "animate-pulse h-4 w-32 bg-gray-200 rounded" : ""}`}
                                >
                                    SKU: {CatalogueDetailData?.cat_code}
                                </h6>

                                {shouldShowPrice(session?.accessToken, webSetting?.showPrice) ? <div className="flex items-center gap-2">
                                    {CatalogueDetailData?.catalogue_discount ? (
                                        <span className="line-through text-gray-400">
                                            <PriceConverter price={CatalogueDetailData?.price} />
                                        </span>
                                    ) : null}

                                    <span className="text-xl font-semibold text-black">
                                        <PriceConverter price={CatalogueDetailData?.offer_price} />
                                    </span>

                                    {CatalogueDetailData?.catalogue_discount ? (
                                        <span className="ml-1 bg-red-100 text-red-600 px-2 py-1 rounded">
                                            {CatalogueDetailData?.catalogue_discount}% off
                                        </span>
                                    ) : null}
                                </div> : (
                                    <button
                                        type="button"
                                        name="add"
                                        onClick={() => router.push("/login")}
                                        className="w-full mb-3 mt-2 bg-red-500 text-white hover:bg-gray-700 py-2 px-4 rounded-none text-center"

                                    >
                                        <span className="text-sm">LOGIN / REGISTER FOR PRICE</span>
                                    </button>
                                )}


                                {Number(CatalogueDetailData?.catalogue_discount) > 0 && (
                                    <OfferBanner discount={Number(CatalogueDetailData?.catalogue_discount)} />
                                )}

                                {CatalogueDetailData?.optionType === "Size" &&

                                    <SizeSelector
                                        sizes={CatalogueDetailData?.Size}
                                        selectedSize={selectedSize}
                                        onChange={setSelectedSize}
                                        errors={errors}
                                        setErrors={setErrors}
                                    />
                                }
                                <div className="border border-gray-200 rounded-lg divide-y shadow-sm mt-5">
                                    <ProductAccordion
                                        product={CatalogueDetailData}
                                        Stitching={stitching}
                                        setStitchingData={setStitchingData}
                                        type="catalogue"
                                        category={CatalogueDetailData?.url}
                                    />
                                </div>
                            </div>

                            <div className="w-full mt-3 rounded-lg p-4 px-0 ">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 w-full md:w-2/3">
                                        <div className="flex items-center border rounded-md py-0.5  ">
                                            <button
                                                type="button"
                                                onClick={decrement}
                                                disabled={quantity === 1}
                                                className="p-2 disabled:opacity-50"
                                            >
                                                <Minus className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <input
                                                type="text"
                                                readOnly
                                                value={quantity}
                                                className="w-7 text-center py-1 text-gray-700"
                                            />
                                            <button type="button" onClick={increment} className="p-2"
                                                disabled={quantity === CatalogueDetailData.quantity || quantity === selectedSize?.quantity}
                                            >
                                                <Plus className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </div>

                                        <div>
                                            <button
                                                disabled={loading}
                                                onClick={handleAddtoCart}
                                                type="submit"
                                                className="bg-white hover:bg-black hover:text-white text-black outline-1 px-6 py-2 rounded-md transition whitespace-nowrap"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : " Add to cart"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-3 w-full md:w-2/3">
                                        <WishlistButton catalogueId={CatalogueDetailData.id} type="catalogue" variant="detail" loginMode="page" />
                                        <Link
                                            href={whatsappURL}
                                            target="_blank"
                                            title="Share on WhatsApp"
                                            className="p-2 rounded-md border border-s border-gray-400 hover:bg-green-100 "
                                        >
                                            <MessageCircle size={20} />
                                        </Link>
                                        <DownloadImage CatalogueDetailData={CatalogueDetailData} />
                                        <DownloadZip CatalogueDetailData={CatalogueDetailData} />
                                    </div>
                                </div>
                                {errors && (
                                    <p className="text-red-500 text-sm mt-2">{errors}</p>
                                )}
                            </div>
                            <div className="mt-5">
                                <StaticImage status={status} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-10">
                    <div className="flex flex-col md:flex-row md:justify-center items-center mb-6 text-center ">
                        <div>
                            <p className="text-[#222222] text-[18px] font-semibold text-center uppercase mt-4"> You may also like this</p>
                            <p className="text-gray-500 text-sm lowercase mb-6">TOP SALE IN THIS WEEK</p>
                        </div>
                    </div>
                    <RalatedCatalogue url={CatalogueDetailData.url} />
                </div>

                {
                    shareOpen && (
                        <SharePopup
                            isOpen={shareOpen}
                            onClose={() => setShareOpen(false)}
                            url={`https://superbazaar.in/`}
                        />
                    )
                }
            </div>
        </>
    )
}

export default Catalogue