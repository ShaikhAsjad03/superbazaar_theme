"use client";

import { useState } from "react";
import { Layers, NotebookText, ScrollText } from "lucide-react";
const ProductDescription = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [data] = useState({
    description:
      "Stretch strap top Nodding to retro styles, this Hyperbola T-shirt is defined by its off-the-shoulder design. Its spun from a green stretch cotton jersey and adorned with an embroidered AC logo on the front, a brand's signature.Thick knitted fabric. Short design. Straight design. Rounded neck. Sleeveless. Straps. Unclosed. Cable knit finish. Co-ord.",
    shipping:
      "Orders are usually shipped within 2-3 business days. Free shipping on orders above $50.",
    returns:
      "You may return most new, unopened items within 30 days of delivery for a full refund.",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ul className="flex flex-wrap sm:flex-nowrap justify-center border-b text-sm font-medium text-gray-500">
        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${activeTab === "description"
              ? "text-zinc-900 border-zinc-900"
              : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
              }`}
          >
            <Layers
              size={20}
              className={`mr-2 ${activeTab === "description" ? "text-zinc-900" : "text-zinc-700"
                }`}
            />
            Description
          </button>
        </li>

        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("shipping")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${activeTab === "shipping"
              ? "text-zinc-900 border-zinc-900"
              : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
              }`}
          >
            <ScrollText
              size={20}
              className={`mr-2 ${activeTab === "shipping" ? "text-zinc-900" : "text-zinc-700"
                }`}
            />
            Shipping & Returns
          </button>
        </li>

        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("returns")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${activeTab === "returns"
              ? "text-zinc-900 border-zinc-900"
              : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
              }`}
          >
            <NotebookText
              size={20}
              className={`mr-2 ${activeTab === "returns" ? "text-zinc-900" : "text-zinc-700"
                }`}
            />
            Return Policies
          </button>
        </li>
      </ul>

      <div className="p-4 sm:p-6 text-center text-gray-600 text-sm sm:text-base">
        {activeTab === "description" && <p>{data.description}</p>}
        {activeTab === "shipping" && <p>{data.shipping}</p>}
        {activeTab === "returns" && <p>{data.returns}</p>}
      </div>
    </div>
  );
};

export default ProductDescription;
