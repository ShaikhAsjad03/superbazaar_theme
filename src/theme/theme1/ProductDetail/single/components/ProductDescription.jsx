"use client";

import { useEffect, useState } from "react";
import { Layers, NotebookText, ScrollText } from "lucide-react";
import { getPoliciesDetail } from "@/services/cmsService";

const ProductDescription = ({ description, attributes }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [shippingPolicy,setShippingPolicy]=useState(null)
   const [returnPolicy,setReturnPolicy]=useState(null)

  const fetchData=async()=>{
    const [shippingPolicy,returnPolicy]=await Promise.all([getPoliciesDetail("shipping-policy"),getPoliciesDetail("return-policy")])
    setReturnPolicy(shippingPolicy.data)
      setShippingPolicy(returnPolicy.data)
      
  }

  useEffect(()=>{
fetchData()
  },[])

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ul className="flex flex-wrap sm:flex-nowrap justify-center border-b text-sm font-medium text-gray-500">
        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${
              activeTab === "description"
                ? "text-zinc-900 border-zinc-900"
                : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
            }`}
          >
            <Layers
              size={20}
              className={`mr-2 ${
                activeTab === "description" ? "text-zinc-900" : "text-zinc-700"
              }`}
            />
            Description
          </button>
        </li>

        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("shipping")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${
              activeTab === "shipping"
                ? "text-zinc-900 border-zinc-900"
                : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
            }`}
          >
            <ScrollText
              size={20}
              className={`mr-2 ${
                activeTab === "shipping" ? "text-zinc-900" : "text-zinc-700"
              }`}
            />
            Shipping & Returns
          </button>
        </li>

        <li className="mx-2 sm:mx-4">
          <button
            onClick={() => setActiveTab("returns")}
            className={`inline-flex items-center px-2 sm:px-3 py-3 sm:py-4 border-b-2 text-sm sm:text-lg transition-colors ${
              activeTab === "returns"
                ? "text-zinc-900 border-zinc-900"
                : "text-zinc-700 border-transparent hover:text-zinc-900 hover:border-zinc-900"
            }`}
          >
            <NotebookText
              size={20}
              className={`mr-2 ${
                activeTab === "returns" ? "text-zinc-900" : "text-zinc-700"
              }`}
            />
            Return Policies
          </button>
        </li>
      </ul>

      <div className="p-4 sm:p-6 text-gray-600 text-sm sm:text-base">
        {activeTab === "description" && (
          <div className="space-y-4">

          {attributes?.length > 0 && (
  <div className=" p-4 bg-white rounded-lg shadow-sm">
    <h3 className="font-semibold mb-3 text-lg text-zinc-900  pb-2">Product Attributes</h3>
    <div className="flex flex-col gap-4">
      {attributes.map((attr) => (
        <div key={attr.key} className="flex flex-wrap items-center gap-2">
          <span className="font-medium w-32 text-zinc-900">{attr.name}:</span>

          {attr.key === "color" ? (
            <div className="flex gap-3 flex-wrap">
              {attr.values?.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 rounded-md "
                >
                  <span
                    className="w-4 h-4 rounded-full "
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
                  className=" px-2 py-1 rounded-md text-sm">
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

        {activeTab === "shipping" &&  <div className="p-6  rounded-xl w-full bg-white">
                <div dangerouslySetInnerHTML={{ __html: shippingPolicy?.description || ""}}></div>
            </div>}
        {activeTab === "returns" &&  <div className="p-6  rounded-xl w-full bg-white">
                <div dangerouslySetInnerHTML={{ __html: returnPolicy?.description || "" }}></div>
            </div>}
      </div>
    </div>
  );
};

export default ProductDescription;
