import { Columns2, Columns3, Columns4, Funnel, SlidersHorizontal } from "lucide-react";

const ProductListToolbar = ({
    title,
    products,
    totalCount,
    sort,
    setSort,
    grid,
    setGrid,
    open,
    setOpen,
    type,
    pathname
}) => {
    const gridButtons = [
        { icon: Columns2, value: 2, label: "2 Grid" },
        { icon: Columns3, value: 3, label: "3 Grid" },
        { icon: Columns4, value: 4, label: "4 Grid" },
    ];
    const sortOptions = [
        { value: "", label: "New Arrivals" },
        { value: "AtoZ", label: "A To Z" },
        { value: "ZtoA", label: "Z To A" },
        { value: "low", label: "Price: Low to High" },
        { value: "high", label: "Price: High to Low" },
    ];
    return (
        <div className="bg-white border-b border-gray-200 sm:px-4 lg:px-5 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap items-center">
                <p className="text-[#222222] text-[20px] font-semibold text-center">{title}</p>
                <p className="text-xs text-gray-500 justify-center">
                    Showing 1–{products.length} of {totalCount} results
                </p>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
                {pathname === "/wholesale" &&

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 px-3 py-1 border rounded-sm shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
                    >
                        <SlidersHorizontal size={18} />
                        Filter
                    </button>}
                {type !== "wholesale" &&
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 p-2 rounded shadow bg-black text-white hover:bg-gray-800 text-sm lg:hidden"
                    >
                        <Funnel size={18} />
                        FILTER
                    </button>}

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded p-2 text-sm shadow-sm hover:shadow-md"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="hidden md:flex gap-1">
                    {gridButtons.map((btn) => {
                        const Icon = btn.icon;
                        return (
                            <button
                                key={btn.value}
                                onClick={() => setGrid(btn.value)}
                                className={`p-2 rounded ${grid === btn.value
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                <Icon size={18} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default ProductListToolbar;
