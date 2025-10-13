"use client";
import { useEffect, useState } from "react";
import { ArrowRightFromLine } from "lucide-react";
import Address from "./components/address";
import PaymentMethod from "./components/paymentMethod";
import OrderSummary from "./components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import ShippingMethod from "./components/ShippingMethod";
import { postCCAvenueOrder, postOrder } from "@/services/checkOutService";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { getCartItems } from "@/services/cartService";
const CheckoutPage = () => {
  const router=useRouter()
  
  const dispatch=useDispatch()
    const { data: session } = useSession();
  const { webSetting } = useSelector((state) => state.webSetting);
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);


  const { CartData } = useSelector((state) => state?.cartItem);
  const totalWeight = Array.isArray(CartData?.data)
    ? CartData.data.reduce((acc, item) => acc + (item.weight || 0) * item.quantity, 0)
    : 0;
   useEffect(() => {
  if (orderPlaced) return;
  const { valid } = validateCheckout();
  if (!valid) {
    router.push("/cart");
  }
}, [CartData, orderPlaced]);

  
  const [payload, setPayload] = useState({
    billingAddress: null,
    shippingAddress: null,
    paymentMethod: null,
    shippingMethod: null,
  });


  const fetchProtectedData = async () => {
     const cartItems=await getCartItems(session?.user?.id);
     dispatch(setCartItems(cartItems));
     
    };
  const handlePlaceOrder = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const { billingAddress, shippingAddress, paymentMethod, shippingMethod } = payload;

      if (!billingAddress || !shippingAddress || !paymentMethod || !shippingMethod) {
        setErrorMsg("Please select billing, shipping, payment, and shipping method.");
        setLoading(false);
        return;
      }

      const body = {
        billingId: billingAddress?.id,
        shippingId: shippingAddress?.id,
        shippingMethodId: shippingMethod?.id,
        paymentName: paymentMethod?.name,
      };



      let response = {}
      if (paymentMethod?.name === "ccAvenue") {
        setSuccessMsg("Redirecting to CCAvenue...");
        const htmlResponse = await postCCAvenueOrder(body);

        const newWindow = window.open("", "CCAvenuePayment", "width=600,height=700");
        if (newWindow) {
          newWindow.document.write(htmlResponse);
          newWindow.document.close();
        } else {
          setErrorMsg("Please allow popups for payment.");
        }
      } else {
        response = await postOrder(body);

      }

    if (response?.isSuccess) {
  setOrderPlaced(true); 
  fetchProtectedData();
  // setSuccessMsg("Order placed successfully!");
  router.push("/account/orders");
} else {
        setErrorMsg(response?.message || "Failed to place order. Try again.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

 
const validateCheckout = () => {
  if (!CartData || CartData.data?.length === 0) {
    return { valid: false, message: "Cart is empty." };
  }

  const {
    minSelectionProductCountEnabled,
    minSelectionProductCount,
    minSelectionPriceEnabled,
    minSelectionPrice,
    bypassIfCatalogueExists,
  } = webSetting;

  const hasCatalogue = CartData?.data?.some((item) => item.isCatalogue === true);

  if (bypassIfCatalogueExists && hasCatalogue) {
    return { valid: true, message: "" };
  }

  let selectionItems = CartData?.data?.filter((item) => item.isCatalogue === false);
  let totalCount = selectionItems?.reduce((sum, item) => sum + (item.quantity || 1), 0);
  let totalPrice = CartData?.totalOrder;

  if (minSelectionProductCountEnabled && totalCount < minSelectionProductCount) {
    return {
      valid: false,
      message: `Minimum ${minSelectionProductCount} products required to checkout.`,
    };
  }

  if (minSelectionPriceEnabled && totalPrice < minSelectionPrice) {
    return {
      valid: false,
      message: `Minimum total amount ₹${minSelectionPrice} required to checkout.`,
    };
  }

  return { valid: true, message: "" };
};


  if (!CartData?.data || !Array.isArray(CartData.data) || CartData.data.length === 0) {
    return <Loading/>
  }
  return (
    <div className="w-full">

      <div className="w-full h-[200px] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-2xl font-medium">Secure Checkout</h1>
      <div className="rounded-b-lg bg-white p-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mt-3">
  <span className="flex flex-row gap-1 font-medium text-sm sm:text-base">
    We Accept Here <ArrowRightFromLine size={18} className="mt-1" />
  </span>
  <img
    src="/chekout.svg"
    className="h-6 sm:h-8 w-auto"
    alt="Accepted Payment Methods"
  />
</div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
        <div>
          <Address
            onCountryChange={(c) => setCountry(c)}
            onAddressChange={(addr) =>
              setPayload((prev) => ({
                ...prev,
                shippingAddress: addr.shippingAddress,
                billingAddress: addr.billingAddress,
              }))
            }
          />
          <PaymentMethod
            onPaymentChange={(method) =>
              setPayload((prev) => ({
                ...prev,
                paymentMethod: method,
              }))
            }
          />
        </div>

        <div>
          <ShippingMethod
            country={country}
            weight={totalWeight}
            totalOrder={CartData?.totalOrder}
            onShippingChange={(shipping) =>
              setPayload((prev) => ({
                ...prev,
                shippingMethod: shipping,
              }))
            }
          />

          <OrderSummary
            cartData={CartData}
            shippingCharge={payload?.shippingMethod}
          />
          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full rounded-lg mt-5 text-white bg-zinc-900 p-3 disabled:opacity-50">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
