"use client";
import PriceConverter from "@/components/PriceConverter";
import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { useModal } from "@/hooks/useModal";
const PriceVisibilityProduct = ({ offerPrice, retailPrice, retailDiscount }) => {
  const { data: session,  } = useSession();
   const { open } = useModal();
   const { webSetting } = useSelector((state) => state.webSetting);
    const canShowPrice = webSetting?.showPrice || session?.accessToken;
if (!canShowPrice) {
  return (
    <div
      className="group  flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
                 font-semibold cursor-pointer
                 text-red-500 hover:text-red-700
                 transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2"
      onClick={() => open("login")}
    >
      <LogIn
        className="hidden sm:block w-4 h-4 transform transition-transform duration-300
                   group-hover:scale-125 group-hover:-rotate-6"
      />
      <span
        className="text-sm text-center sm:text-left
                   relative transform transition-transform duration-300
                   group-hover:translate-x-1"
      >
        Login to view Price
      </span>
    </div>
  );
}



  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      <span className="text-zinc-900 text-base sm:text-sm font-medium">
        <PriceConverter price={offerPrice} />
      </span>

      {retailDiscount !== 0 && (
        <span className="text-gray-400 line-through text-sm">
          <PriceConverter price={retailPrice} />
        </span>
      )}

      {retailDiscount !== 0 && retailPrice && offerPrice && (
        <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded-md">
          {retailDiscount}% OFF
        </span>
      )}
    </div>
  );
};

export default PriceVisibilityProduct;
