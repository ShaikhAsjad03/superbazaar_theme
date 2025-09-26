"use client";

import { useEffect, useState } from "react";
import { Facebook, Loader2, MessageCircle, Minus, Plus, Twitter } from "lucide-react";
import ProductImageGallery from "./components/ProductImageGallery";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import ProductAccordion from "./components/ProductAccordion";
import { useRouter } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import Breadcrum from "../../components/BreadCrums/Breadcrum";
import PriceConverter from "@/components/PriceConverter";
import SizeSelector from "@/components/SizeSelector";
import RealtedProduct from "./components/RelatedProduct";
import { addToCartProduct, getCartItems } from "@/services/cartService";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { openCart } from "@/store/slice/MiniCartSlice";
import shouldShowPrice from "@/helper/shouldShowPrice";
import { getWebSetting } from "@/services/webSetting";
import { setWebSetting } from "@/store/slice/webSettingSlice";

const ProductDetailTheme2 = ({ product, Stitching, attributes, category }) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [stitchingData, setStitchingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const webSetting = useSelector(state => state.webSetting.webSetting)

  const fetchData = async () => {
    const data = await getWebSetting();
    dispatch(setWebSetting(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const increment = () => {
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
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddtoCart = async () => {
    setErrors(null);

    if (!session?.accessToken) {
      router.push("/login");
      return;
    }

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
    <>
      <Breadcrum category={category} name={product.name} />
      <div className="container mx-auto px-4 mt-7">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-7/12 mb-4 md:pr-4 lg:pr-6 relative">
            <div className="flex gap-4">
              <ProductImageGallery images={product.image} thumbs={product.thumbImage} product_id={product.id} />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-5/12 mt-4 md:mt-0 px-4">
            <div className="sticky top-4">
              {product.ProductBrand?.length === 0 ? "" :
                <h2 className="text-lg font-medium mb-2"><Link href={`/brand/${product.ProductBrand[0]?.brand.url}`}>
                  Brand: <span className=" text-red-500 px-2 py-1 rounded">{product.ProductBrand[0]?.brand.name}</span></Link>
                </h2>}
              <h5 className="text-[18px] mb-1">{product.name}</h5>
              <p className="text-gray-600 mb-2">SKU:{product.sku}</p>
              {shouldShowPrice(session?.accessToken, webSetting?.showPrice) ?
                <div className="mb-4">
                  <span className="line-through "><PriceConverter price={product.offer_price} /></span>
                  <span className=" text-gray-400 mx-3"><PriceConverter price={product.retail_price} /></span>
                </div> : (
                  <button
                    type="button"
                    name="add"
                    onClick={() => router.push("/login")}
                    className="w-full mb-3 bg-red-500 text-white hover:bg-gray-700 py-2 px-4 rounded-none text-center"

                  >
                    <span className="text-sm">LOGIN / REGISTER FOR PRICE</span>
                  </button>
                )}
              {
                product.optionType === "Size" && (
                  <div className=" mb-3">
                    <SizeSelector
                      sizes={attributes.sizes || ["S", "M", "L", "XL"]}
                      onChange={setSelectedSize}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>)
              }

              <div className="border border-gray-200 rounded-lg divide-y shadow-sm">
                <ProductAccordion
                  product={product}
                  Stitching={Stitching}
                  attributes={attributes}
                  setStitchingData={setStitchingData}
                  catalogUrl={product?.catalogue?.url}
                />
              </div>

              <div className="w-full mt-3 rounded-lg p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full  md:w-2/3">
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
                        disabled={quantity === product.quantity || quantity === selectedSize?.quantity}
                      >
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        onClick={handleAddtoCart}
                        type="submit"
                        className="bg-white hover:bg-black hover:text-white text-black outline-1 px-6 py-2 rounded-md transition"
                      >
                        Add to cart
                        {/* {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : " Add to cart"} */}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 w-full md:w-1/3">
                    <button
                      title="Share on Facebook"
                      className="p-2 rounded-md border border-s border-gray-400 hover:bg-blue-100"
                    >
                      <Facebook className="w-6 h-6 text-blue-600" />
                    </button>
                    <button
                      title="Share on WhatsApp"
                      className="p-2 rounded-md border border-s border-gray-400 hover:bg-green-100 "
                    >
                      <MessageCircle className="w-6 h-6 text-green-500" />
                    </button>
                    <button
                      title="Share on Twitter"
                      className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100"
                    >
                      <Twitter className="w-6 h-6 text-sky-500" />
                    </button>
                  </div>

                </div>
              </div>
              {errors && (
                <p className="text-red-500 text-sm mt-2">{errors}</p>
              )}
              {attributes?.moreColors?.length > 0 && <div className="mt-10" >
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {
                    attributes?.moreColors?.map((product, i) => {
                      return (
                        <Link key={i} href={`/retail/${category}/${product.url}`} className="flex-shrink-0 ">
                          <Image src={ImageUrl(product.image[0])} alt="Thumb 1" className="w-20 h-32 object-cover rounded"
                            width={133}
                            height={200}
                          />
                        </Link>
                      )
                    })
                  }
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <RealtedProduct url={product.url} />
      </div>
    </>

  );
};

export default ProductDetailTheme2;
