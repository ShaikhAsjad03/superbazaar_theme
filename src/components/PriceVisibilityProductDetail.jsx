"use client";
import PriceConverter from "@/components/PriceConverter";
import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { useModal } from "@/hooks/useModal";

const PriceVisibilityProductDetail = ({ offerPrice, retailPrice, retailDiscount }) => {
  const { data: session } = useSession();
  const { open } = useModal();
  const { webSetting } = useSelector((state) => state.webSetting);
  const canShowPrice = webSetting?.showPrice || session?.accessToken;

  if (!canShowPrice) {
    return (
      <div
        onClick={() => open("login")}
        className="relative w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-2 
                   px-4 py-3 rounded-lg border border-dashed border-red-400 bg-red-50 
                   text-red-500 font-semibold cursor-pointer transition-all duration-300 
                   hover:bg-red-100 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 
                        border border-red-300 transition-transform duration-300 group-hover:rotate-6">
          <LogIn className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-sm sm:text-base">Login to View Price</span>
        </div>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 
                         rounded-full shadow-md uppercase">
          Locked
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-0">
      <span className="text-md sm:text-lg font-medium text-red-600">
        <PriceConverter price={offerPrice} />
      </span>

{Number(retailDiscount) > 0 && (
  <span className="text-sm sm:text-base text-zinc-700 line-through">
    <PriceConverter price={retailPrice} />
  </span>
)}

{Number(retailDiscount) > 0 && (
  <span className="text-sm sm:text-base font-semibold text-green-600">
    {retailDiscount}% OFF
  </span>
)}

    </div>
  );
};

export default PriceVisibilityProductDetail;
