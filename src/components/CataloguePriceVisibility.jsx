"use client";
import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import PriceConverter from "@/components/PriceConverter";
import { useModal } from "@/hooks/useModal";

const CataloguePriceVisibility = ({ avgPrice, offerPrice, fullPrice, discount }) => {
  const { data: session } = useSession();
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
                   group-hover:scale-125 group-hover:-rotate-6"/>
      <span
        className="text-sm sm:text-left
                   relative transform transition-transform duration-300
                   group-hover:translate-x-1">
        Login to view Price
      </span>
    </div>
  );
}

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-1">
      {avgPrice && (
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-zinc-900 text-sm">Avg Price</span>
          <span className="text-sm sm:text-base text-zinc-900 mt-1">
            <PriceConverter price={avgPrice} />
          </span>
        </div>
      )}

      {offerPrice && (
        <div className="flex flex-col items-center sm:items-end">
          <span className="text-zinc-900 text-sm">Full Price</span>
          <span className="text-zinc-900 mt-1">
            <PriceConverter price={offerPrice} />
          </span>
          {discount && fullPrice && offerPrice < fullPrice && (
            <span className="text-gray-400 line-through text-sm">
              <PriceConverter price={fullPrice} />
            </span>
          )}
          {discount && fullPrice && offerPrice < fullPrice && (
            <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CataloguePriceVisibility;
