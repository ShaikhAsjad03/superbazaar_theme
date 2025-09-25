"use client";
import { useState } from "react";
import { ArrowRightFromLine } from "lucide-react";
import Address from "./components/address";
import PaymentMethod from "./components/paymentMethod";
import OrderSummary from "./components/OrderSummary";
import { useSelector } from "react-redux";
import ShippingMethod from "./components/ShippingMethod";
import { postCCAvenueOrder, postOrder } from "@/services/checkOutService";

const CheckoutPage = () => {
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { CartData } = useSelector((state) => state?.cartItem);
  const totalWeight = Array.isArray(CartData?.data)
    ? CartData.data.reduce((acc, item) => acc + (item.weight || 0) * item.quantity, 0)
    : 0;

  const [payload, setPayload] = useState({
    billingAddress: null,
    shippingAddress: null,
    paymentMethod: null,
    shippingMethod: null,
  });

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
        setSuccessMsg("Order placed successfully!");
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

  return (
    <div className="w-full">

      <div className="w-full h-[200px] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-2xl font-medium">Secure Checkout</h1>
        <div className="rounded-b-lg bg-white p-2 flex justify-center items-center gap-3 mt-3">
          <span className="flex flex-row gap-1 font-medium">
            We Accept Here <ArrowRightFromLine size={18} className="mt-1" />
          </span>
          <img src="/chekout.svg" style={{ height: "30px" }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
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
