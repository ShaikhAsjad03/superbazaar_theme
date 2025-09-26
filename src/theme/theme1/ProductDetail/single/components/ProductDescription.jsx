"use client";

import { useEffect, useState } from "react";
import { Layers, NotebookText, ScrollText } from "lucide-react";
import { getPoliciesDetail } from "@/services/cmsService";

const ProductDescription = ({ description, attributes }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [shippingPolicy, setShippingPolicy] = useState(null);
  const [returnPolicy, setReturnPolicy] = useState(null);

  const fetchData = async () => {
    const [shippingRes, returnRes] = await Promise.all([
      getPoliciesDetail("shipping-policy"),
      getPoliciesDetail("return-policy"),
    ]);
    setShippingPolicy(shippingRes.data);
    setReturnPolicy(returnRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <ul className="flex flex-wrap justify-around border-b text-sm font-medium text-gray-500">
        {[
          { key: "description", label: "Description", icon: Layers },
          { key: "shipping", label: "Shipping & Returns", icon: ScrollText },
          { key: "returns", label: "Return Policies", icon: NotebookText },
        ].map(({ key, label, icon: Icon }) => (
          <li key={key} className="flex-1 text-center">
            <button
              onClick={() => setActiveTab(key)}
              className={`flex flex-col sm:flex-row items-center justify-center w-full py-3 border-b-2 transition-colors ${
                activeTab === key
                  ? "text-zinc-900 border-zinc-900"
                  : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
              }`}
            >
              <Icon
                size={20}
                className={`mb-1 sm:mb-0 sm:mr-2 ${
                  activeTab === key ? "text-zinc-900" : "text-zinc-700"
                }`}
              />
              <span className="text-xs sm:text-sm">{label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 sm:p-6 text-gray-600 text-sm sm:text-base space-y-4">
        {activeTab === "description" && (
          <div className="space-y-4">
            {attributes?.length > 0 && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 text-lg text-zinc-900 pb-2">
                  Product Attributes
                </h3>
             <div className="flex flex-col gap-4">
  {attributes.map((attr) => (
    <div
      key={attr.key}
      className="flex flex-row flex-wrap items-center gap-2"
    >
      {/* Label */}
      <span className="font-medium min-w-[100px] text-zinc-900">
        {attr.name}:
      </span>

      {/* Values */}
      {attr.key === "color" ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {attr.values?.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-md flex-shrink-0"
            >
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: v.color }}
              ></span>
              <span className="text-sm">{v.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {attr.values?.map((v, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-md text-sm bg-gray-100"
            >
              {typeof v === "object" ? v.value || v.name : v}
            </span>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

              </div>
            )}

            <p className="text-zinc-900">{description}</p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="p-4 sm:p-6 rounded-xl w-full bg-white">
            <div
              className="prose max-w-full break-words"
              dangerouslySetInnerHTML={{
                __html: shippingPolicy?.description || "",
              }}
            ></div>
          </div>
        )}

        {activeTab === "returns" && (
          <div className="p-4 sm:p-6 rounded-xl w-full bg-white">
            <div
              className="prose max-w-full break-words"
              dangerouslySetInnerHTML={{
                __html: returnPolicy?.description || "",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
