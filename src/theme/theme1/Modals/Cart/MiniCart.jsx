"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "@/store/slice/MiniCartSlice";
import { X, Trash2, Loader2 } from "lucide-react";
import FreeShippingProgress from "./FreeShippingProgress";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import { useCartActions } from "@/hooks/useCartActions";
import StitchingOptions from "@/components/StitchingOption";
import Link from "next/link";
import Label from "@/components/Label";
import { useRouter } from "next/navigation";
const MiniCart = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.minicart.isCartOpen);
  const { CartData } = useSelector((state) => state.cartItem);
  const [cartItems, setCartItemsState] = useState([]);
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);
  const [error, setError] = useState(null)
  const {
    incrementQuantity,
    decrementQuantity,
    removeItem,
    loadingIds,
    deleteLoading } = useCartActions();
  useEffect(() => {
    setCartItemsState(CartData || []);
  }, [CartData]);


  const toggleCatalogue = (id) => {
    setOpenCatalogueIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };


  const handleCheckout = () => {
    if (!CartData?.data || CartData.data.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const outOfStock = cartItems?.data?.filter((item) => item.outOfStock);
    if (outOfStock && outOfStock.length > 0) {
      setError("Remove out of Stock Product");
      return;
    }
    setError(null);
    dispatch(closeCart());
    router.push("/checkout")
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isCartOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
          }`}
        style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
        onClick={() => dispatch(closeCart())}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[20rem] lg:w-[30rem] bg-white shadow-2xl z-50 transform transition-transform duration-500 flex flex-col rounded-l-2xl ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-1 rounded hover:bg-zinc-900 hover:text-white"
          >
            <X size={25} />
          </button>
        </div>
        <div className="m-5">
          <FreeShippingProgress
            currentAmount={75}
            shippingThreshold={100}
            isModalOpen={isCartOpen}
          />
        </div>
        {error && (
          <div className="bg-red-200 border border-dotted border-red-400 text-red-600 px-4 py-3 rounded relative mt-2 flex items-start justify-between" role="alert">
            <div>
              <strong className="font-medium">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="ml-4">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems?.data?.length === 0 && <p className="text-center font-bold">Your cart is empty.</p>}
          {cartItems?.data?.map((item) => {
            const size = item?.size ? JSON.parse(item.size) : null;
            const isLoading = loadingIds.includes(item.id);
            return (
              <div key={item.id} className="p-3 border-b-1 border-gray-300">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="relative">
                      {item?.outOfStock && <Label text={"Out of stock"} danger={item?.outOfStock} />}
                      <Image
                        src={ImageUrl(item.image)}
                        alt={item.name}
                        height={300}
                        width={300}
                        className="w-20 h-30  rounded-md"
                      />

                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm">₹{item.price}</p>

                      {size?.value && <p className="block">Size: {size?.value}</p>}

                      <StitchingOptions stitching={item.stitching} />
                      <div className="flex items-center border border-gray-400 rounded-md overflow-hidden w-20 mt-2">
                        <button
                          disabled={item.quantity <= 1 || isLoading}
                          onClick={() => decrementQuantity(item)}
                          className="w-5 p-1 bg-gray-200 hover:bg-gray-300 transition text-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? <Loader2 className="animate-spin h-3 w-3 mx-auto" /> : "-"}
                        </button>
                        <span className="p-1 flex-1 text-center text-md">
                          {item.quantity}
                        </span>
                        <button
                          disabled={item.quantity >= item.availableQuantity || isLoading}
                          onClick={() => incrementQuantity(item)}
                          className="w-6 p-1 bg-gray-200 hover:bg-gray-300 transition text-md disabled:opacity-50 disabled:cursor-not-allowed">
                          {isLoading ? <Loader2 className="animate-spin h-3 w-3 mx-auto" /> : "+"}
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        Available: {item?.availableQuantity || 0}
                      </p>
                    </div>



                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={deleteLoading === item.id}
                    className="p-1 rounded hover:bg-red-100 text-red-500 disabled:opacity-50"
                  >
                    {deleteLoading === item.id ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </div>

                {item.isCatalogue && item.products && (
                  <div className="mt-3">
                    <button
                      onClick={() => toggleCatalogue(item.id)}
                      className="text-blue-600 text-sm font-medium underline">
                      {openCatalogueIds.includes(item.id)
                        ? "Hide Products"
                        : "Show Products"}
                    </button>
                    {openCatalogueIds.includes(item.id) && (
                      <div className="mt-2 space-y-2 pl-4 border-l">
                        {item.products.map((p) => (
                          <div
                            key={p.code}
                            className="flex items-center justify-between text-sm gap-2 relative">
                            <div className="flex  items-center gap-2">
                              <div className="w-10 h-10 relative flex-shrink-0">
                                <Image
                                  src={ImageUrl(p.image[0])}
                                  alt={p.name}
                                  fill
                                  className="object-contain rounded"
                                  sizes="40px"
                                />
                              </div>
                              <span className="truncate max-w-[150px]">{p.name}</span>
                            </div>

                            {p?.outOfStock && <Label text={"Out of stock"} danger={p?.outOfStock} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t flex flex-col gap-2 sticky bottom-0 bg-white">
          <div className="flex justify-between">
            <p>Total Price</p>
            <p> <PriceConverter price={cartItems?.totalOrder || 0} /> </p>
          </div>


          <Link
            href="/cart"
            onClick={() => dispatch(closeCart())}
            className="flex-1 py-2 text-center rounded-lg bg-gray-100 hover:bg-gray-200 transition font-medium"
          >
            View Cart
          </Link>


          <button
            onClick={handleCheckout}
            className="w-full py-2 bg-zinc-900 text-white rounded hover:bg-grey-700 text-center"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniCart;
