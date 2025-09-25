"use client";
import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Lock, Trash2, Loader2, X } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import FreeShippingProgress from "@/theme/theme1/Modals/Cart/FreeShippingProgress";
import StitchingOptions from "@/components/StitchingOption";
import { useCartActions } from "@/hooks/useCartActions";
import Link from "next/link";
import PriceConverter from "@/components/PriceConverter";
import Label from "@/components/Label";
import { useRouter } from "next/navigation";
const CartItems = ({ CartData }) => {
  const router=useRouter()
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);
  const [error,setError]=useState(null)
  const {
    incrementQuantity,
    decrementQuantity,
    removeItem,
    loadingIds,
    deleteLoading } = useCartActions();

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
    const outOfStock = CartData?.data?.filter((item) => item.outOfStock);


    if (outOfStock && outOfStock.length > 0) {
      setError("Remove out of Stock Product");
      return; 
    }
    setError(null); 
    router.push("/checkout")
   
  };
  
  return (
    <div className="mx-auto mt-7  
        w-full 
        sm:max-w-[540px] 
        md:max-w-[720px] 
        lg:max-w-[960px] 
        xl:max-w-[1140px] 
        2xl:max-w-[1320px] px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white shadow rounded-2xl p-6">
          <FreeShippingProgress
            currentAmount={75}
            shippingThreshold={100}
            isModalOpen={true}
          />
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

          {CartData?.data?.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-12 text-gray-600 text-sm font-medium border-b pb-2 mb-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y">
                {CartData?.data?.length > 0 && CartData?.data?.map((item) => {
                  let sizeObj;
                  const isLoading = loadingIds.includes(item.id);
                  try {
                    sizeObj = JSON.parse(item.size);
                  } catch {
                    sizeObj = {};
                  }

                  return (
                    <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start justify-between py-4 gap-4">
                      <div className="col-span-6 flex gap-4">
                        <div className="relative">
                            {item?.outOfStock && <Label text={"Out of stock"} danger={item?.outOfStock}/>}
                        <Image
                          src={ImageUrl(item.image)}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover max-h-[150px] w-auto "
                        />

                        </div>
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                          <StitchingOptions stitching={item.stitching} />
                          {sizeObj?.value && (
                            <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                          )}

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
                                      className="flex items-center justify-between text-sm gap-2 ">
                                      <div className="flex  items-center gap-2">
                                        <div className="w-25 h-15 relative flex-shrink-0">
                                           {p?.outOfStock && <Label text={"Out of stock"} danger={p?.outOfStock}/>}
                                          <Image
                                            src={ImageUrl(p.image[0])}
                                            alt={p.name}
                                            fill
                                            className="object-contain rounded"
                                            sizes="60px"
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                        <span className="truncate max-w-[150px]">{p.name}</span>
                                        <div className="text-gray-500">Price:{p.price}</div>

                                        </div>
                                      </div>

                                     
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 text-center font-medium">
                        ₹{item.price}
                      </div>


                      <div className="col-span-2  mt-2">
                       <div className="flex items-center border border-gray-400 rounded-md overflow-hidden w-20">
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
                          className="w-6 p-1 bg-gray-200 hover:bg-gray-300 transition text-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? <Loader2 className="animate-spin h-3 w-3 mx-auto" /> : "+"}
                        </button>
                       </div>

                         <p className="text-xs text-gray-500 mt-1">
  Available: {item?.availableQuantity || 0}
</p>
                      </div>

                       
          
                      <div className="col-span-2 flex justify-between md:justify-end items-center gap-2 font-medium">
                        <p>₹{item.subtotal}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                          disabled={deleteLoading === item.id}
                        >
                          {deleteLoading === item.id ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : (
                            <Trash2 size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>


        <div className="lg:col-span-4 bg-white shadow rounded-2xl p-6">
          
  {error && (
            <div className="bg-red-200 border border-dotted border-red-400 text-red-600 px-4 py-3 rounded relative mt-2 flex items-start justify-between" role="alert">
              <div>
                <strong className="font-medium">Error: </strong>
                <span className="block sm:inline text-sm">{error}</span>
              </div>
              <button onClick={() => setError(null)} className="ml-4">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
          <div className="border-b-1 border-gray-300"></div>
          <div className="space-y-2 text-sm mt-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <PriceConverter price={CartData?.totalSubtotal}/>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <PriceConverter price={CartData?.totalTax}/>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
               <PriceConverter price={CartData?.totalOrder}/>
            </div>
          </div>
          <div className="mt-8  w-full">
  <button
  onClick={handleCheckout}
      className="mt-6 mb-10 block w-full bg-indigo-600 hover:bg-indigo-700 
               text-white p-3 rounded-lg font-medium shadow-lg 
               transition-transform transform hover:scale-105 text-center"
  >
    Proceed to Checkout
  </button>

  <div className="mt-6 flex flex-col items-center">
    <Image
      alt="safe payment"
      src={"/safepayment.webp"}
      height={100}
      width={250}
      className="rounded-lg object-contain"
    />
    <p className="mt-2 text-sm text-zinc-900">
      100% Safe & Secure Payments
    </p>

    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-50 shadow-sm">
        <Lock className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-gray-700">
          SSL Encrypted
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-yellow-50 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-yellow-600" />
        <span className="text-sm font-medium text-gray-700">
          Money Back Guarantee
        </span>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default CartItems;
