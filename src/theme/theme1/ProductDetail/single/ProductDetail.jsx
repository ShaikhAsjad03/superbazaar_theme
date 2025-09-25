"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CircleQuestionMark, Heart, MessageCircle, Repeat, Share2, ShoppingCart, X } from "lucide-react";
import OfferBanner from "@/components/OfferBanner";
import ProductImageGallery from "./components/ProductImageGallery";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openCart } from "@/store/slice/MiniCartSlice";
import { useModal } from "@/hooks/useModal";
import { addToCartProduct, getCartItems } from "@/services/cartService";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUrl } from "@/helper/imageUrl";
const SizeSelector = dynamic(() => import("@/components/SizeSelector"));
const SharePopup = dynamic(() => import("./components/SharePopup"));
const RalatedProduct = dynamic(() => import("./components/RelatedProduct"));
const StitchingForm = dynamic(() => import("./components/StitchingForm"));
const ProductDescription = dynamic(() => import("./components/ProductDescription"));
const StaticImage = dynamic(() => import("@/components/StaticImage"));
const MoreColors = dynamic(() => import("./components/MoreColors"));
const InquiryForm = dynamic(() => import("../components/inquiry"));
const ProductDetailTheme1 = ({ product, Stitching, attributes, category }) => {
  const dispatch = useDispatch()
  const { open } = useModal();
  const { data: session, status } = useSession();
  const [inquiry, setInquiry] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [stitchingData, setStitchingData] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setWishlist((prev) => !prev);
  const toggleCompare = () => setCompare((prev) => !prev);

  const handleAddtoCart = async () => {
    setErrors(null);
    if (product.optionType === "Size" && !selectedSize) {
      return setErrors("⚠️ Please select size");
    }

    if (product.optionType === "Stitching") {
      if (!stitchingData || stitchingData.stitching.length === 0) {
        return setErrors("⚠️ Please select stitching option");
      }
      if (!stitchingData.isValid) {
        return setErrors("⚠️ Please fill all required measurements");
      }
    }
    if (!session?.accessToken) {
      open("login")
      return
    }

    setLoading(true);
    try {
      const finalCartData = {
        product_id: product.id,
        quantity: quantity,
        user_id: session?.user?.id,
        ...(product.optionType === "Size" && { size: selectedSize }),
        ...(product.optionType === "Stitching" && { stitching: stitchingData?.stitching || [] }),
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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductImageGallery
            images={product.image}
            thumbs={product.thumbImage} />
        </div>

        <div className="flex flex-col gap-4 md:gap-4">
          <div>
            {product?.ProductBrand?.map((item, index) => (
              <Link
                key={index}
                href={`/brand/${item.brand.url}`}
                className="text-blue-600 hover:underline">
                {item.brand.name}
              </Link>
            ))}
            <div>
              <span>View Full Catalogue: </span>
              {product?.catalogue?.url && (
                <Link
                  href={`/catalogue/${category}/${product?.catalogue?.url}`}
                  className="text-blue-600 hover:underline">
                  {product?.catalogue?.name}
                </Link>
              )}
            </div>
            <h1 className="text-xl font-medium">{product?.name}</h1>
            <p className="text-gray-500 mt-1">{product?.sku}</p>
            <p className="text-xl font-semibold mt-2">
              ₹{product?.offer_price}
            </p>
          </div>
          <p className="flex items-center gap-2 bg-slat-100 text-zinc-800 font-medium px-3 py-1 rounded-lg w-fit">
            <span className="font-bold">⏱</span> Dispatch Time: 7 Working Days
          </p>

          <MoreColors moreColors={attributes.moreColors} basepath={category} />
          <OfferBanner discount={product.retail_discount} />
          {product.optionType === "Size" ? (
            <div className="-mt-1">
              <SizeSelector
                sizes={attributes.sizes || ["S", "M", "L", "XL"]}
                onChange={setSelectedSize}
                errors={errors}
                setErrors={setErrors}
              />
            </div>) : (
            <StitchingForm stitchingData={Stitching} onChange={setStitchingData} />
          )}

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded-lg overflow-hidden w-40">
              <button
                onClick={decrement}
                className="w-12 py-2 bg-gray-200 hover:bg-gray-300 transition text-lg font-bold">
                -
              </button>
              <span className="flex-1 text-center py-2 text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="w-12 py-2 bg-gray-200 hover:bg-gray-300 transition text-lg font-bold">
                +
              </button>
            </div>
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-lg border transition ${wishlist
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white"
                }`}>
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="p-2 rounded-lg border bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setInquiry((prev) => !prev)}
              className="p-2 rounded-lg border bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white transition">
              <CircleQuestionMark className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-row gap-4 mt-4 w-full">
            <button
              disabled={loading}
              onClick={handleAddtoCart}
              className="w-full flex items-center justify-center bg-zinc-900 text-white px-6 py-3 rounded-lg  transition disabled:opacity-70 gap-2"
            >
              <span className="flex gap-2"> <ShoppingCart />Add to Cart</span>
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </button>
          </div>
          {errors && (
            <div className="bg-red-200 border border-dotted border-red-400 text-red-600 px-4 py-3 rounded relative mt-2 flex items-start justify-between" role="alert">
              <div>
                <strong className="font-medium">Error: </strong>
                <span className="block sm:inline">{errors}</span>
              </div>
              <button onClick={() => setErrors(null)} className="ml-4">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
          <div className="border-t border-gray-500 border-dashed mt-3"></div>


          <div>
            <StaticImage />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductDescription description={product.description} attributes={attributes.attributeValues} />
      </div>
      <div className="w-full mt-10">
        <h1 className="text-2xl font-normal text-center mb-10">You May Also Like this</h1>
        <RalatedProduct url={product.url} />
      </div>
      <SharePopup
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        name={product.name}
        image={ImageUrl(product?.image[0])}
        url={`${process.env.NEXT_PUBLIC_API_URL}api/public/shareproduct/${product.id}`}
      />

      <InquiryForm
        open={inquiry}
        onClose={() => setInquiry(false)}
        catalogue_id={null}
        product_id={product.id}
      />


    </div>
  );
};

export default ProductDetailTheme1;
