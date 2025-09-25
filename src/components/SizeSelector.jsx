import { useState } from "react";

const SizeSelector = ({ sizes = [], onChange, errors, setErrors }) => {
  const [activeSize, setActiveSize] = useState(null);

  const handleClick = (size) => {
    if (size.quantity === 0) return;
    setActiveSize(size.value);
    const data = {
      id: size?.id,
      value: size?.value,
    }
    if (onChange) onChange(data);
    setErrors(null);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Sizes</h2>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => handleClick(size)}
            disabled={size.quantity === 0}
            className={`px-4 py-2 border rounded-md transition
              ${activeSize === size.value ? "bg-black text-white" : "hover:bg-black hover:text-white"}
              ${size.quantity === 0 ? "line-through text-gray-400 cursor-not-allowed" : ""}
            `}
          >
            {size.value} {size.quantity === 0 ? "(Out of stock)" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
