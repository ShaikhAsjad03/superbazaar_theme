import { useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";

const ProductSizeChart = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const sizeChartCategory = product?.categories?.find(
    (c) => c?.category?.sizeChart
  );

  const sizeChartImage = sizeChartCategory?.category?.sizeChart;
  if (!sizeChartImage) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-600 underline hover:text-red-800"
      >
        Size Chart
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-lg p-4 max-w-md w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Image
              src={ImageUrl(sizeChartImage)}
              alt="Size Chart"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSizeChart;
