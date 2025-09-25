import { Package, Shirt } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductViewTabs = ({ category, activeTab, setActiveTab }) => {
    const router = useRouter();

    const handleFullSetClick = () => {
        setActiveTab("full");
        router.push(`/wholesale/${category}`);
    };

    const handleSingleClick = () => {
        setActiveTab("single");
        router.push(`/retail/${category}`);
    };

    return (
        <div className="flex gap-2 mb-3">
            <button
                onClick={handleFullSetClick}
                className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "full"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-400"
                    }`}
            >
                <Package size={18} />
                FULL SET
            </button>

            <button
                onClick={handleSingleClick}
                className={`flex items-center gap-2 p-3 rounded shadow text-sm font-medium ${activeTab === "single"
                    ? "bg-red-500 text-white"
                    : "bg-white hover:bg-gray-200"
                    }`}
            >
                <Shirt size={18} />
                SINGLE
            </button>
        </div>
    );
};

export default ProductViewTabs;
