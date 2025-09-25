import { X } from "lucide-react";

const SelectedFilters = ({ selectedAttributes, onFiltersChange, setSelectedAttributes, fetchProducts }) => {
  const handleRemove = (key, value) => {
    const updated = { ...selectedAttributes };
    if (!updated[key]) return;

    updated[key] = updated[key]?.filter((item) => item.value !== value);
    if (updated[key].length === 0) {
      delete updated[key];
    }

    setSelectedAttributes(updated);
    onFiltersChange(updated);
  };

  const handleClearAll = () => {
    setSelectedAttributes({});
    fetchProducts();
  };
  const hasFilters = Object.values(selectedAttributes).some(
    (items) => Array.isArray(items) && items.length > 0
  );

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(selectedAttributes).map(([key, items]) =>
        (Array.isArray(items) ? items : []).map((item) => (
          <span
            key={`${key}-${item.value}`}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border"
          >
            {item.label}
            <button onClick={() => handleRemove(key, item.value)}>
              <X className="w-4 h-4" />
            </button>
          </span>
        ))
      )}

      {hasFilters && (
        <button
          onClick={handleClearAll}
          className="flex items-center gap-1 px-4 py-1 rounded-full bg-black text-white"
        >
          REMOVE ALL <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SelectedFilters;

