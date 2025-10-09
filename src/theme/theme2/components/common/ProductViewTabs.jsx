// "use client";
// import { useState } from "react";
// import { Package, Shirt } from "lucide-react";

// const tabData = [
//     { title: "Full Set", key: "wholesale", icon: Package },
//     { title: "Single", key: "retail", icon: Shirt },
// ];

// const ProductTypeToggle = ({ onChange }) => {
//     const [activeTab, setActiveTab] = useState("wholesale");

//     const handleClick = (key) => {
//         setActiveTab(key);
//         if (onChange) onChange(key);
//     };

//     return (
//         <div className="flex gap-2 mb-3">
//             {tabData.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.key;
//                 return (
//                     <button
//                         key={tab.key}
//                         onClick={() => handleClick(tab.key)}
//                         className={`flex items-center gap-2 p-3 rounded shadow text-[15px] font-medium ${isActive
//                             ? "bg-red-800 text-white" : "bg-gray-200 text-black "}`}
//                     >
//                         <Icon size={18} />
//                         {tab.title}
//                     </button>
//                 );
//             })}
//         </div>
//     );
// };

// export default ProductTypeToggle;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Shirt } from "lucide-react";

const tabData = [
    { title: "Full Set", key: "wholesale", icon: Package },
    { title: "Single", key: "retail", icon: Shirt },
];

const ProductTypeToggle = ({ category, onChange }) => {
    const [activeTab, setActiveTab] = useState("wholesale");
    const router = useRouter();

    const handleClick = (key) => {
        setActiveTab(key);
        if (onChange) onChange(key);
        handlePurchaseChange(key);
    };

    const handlePurchaseChange = (type) => {
        if (type === "wholesale") router.push(`/wholesale/${category}`);
        else router.push(`/retail/${category}`);
    };

    return (
        <div className="flex gap-2 mb-3">
            {tabData.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                    <button
                        key={tab.key}
                        onClick={() => handleClick(tab.key)}
                        className={`flex items-center gap-2 p-3 rounded shadow text-[15px] font-medium ${isActive ? "bg-red-800 text-white" : "bg-gray-200 text-black"
                            }`}
                    >
                        <Icon size={18} />
                        {tab.title}
                    </button>
                );
            })}
        </div>
    );
};

export default ProductTypeToggle;
