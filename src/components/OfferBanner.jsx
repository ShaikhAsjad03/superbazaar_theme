import { Tags } from "lucide-react";

const OfferBanner = ({ discount }) => {
  return (
    <div className="offer-banner border border-zinc-800 border-dashed flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 via-slate-100 to-yellow-50 transform transition duration-300 hover:scale-105">
      <div className="flex-shrink-0 p-2 bg-slate-900 rounded-lg">
        <Tags className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="text-yellow-800 font-semibold mb-1 text-base sm:text-lg">
          {discount ? "Limited Time Offer!" : "Special Offer!"}
        </div>
        <div className="text-gray-800 font-bold text-sm sm:text-md md:text-lg leading-snug">
          {discount
            ? `FLAT ${discount}% OFF + FREE SHIPPING on USD 399*`
            : "FREE SHIPPING on all orders!"}
        </div>
      </div>

      {discount !== 0 && (
        <div className="sm:ml-auto bg-red-500 text-white font-bold px-3 py-1 rounded-full text-xs sm:text-sm animate-bounce">
          {discount}% OFF
        </div>
      )}
    </div>
  );
};

export default OfferBanner;
