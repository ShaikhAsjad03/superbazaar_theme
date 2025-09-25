"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";

const ProductImageGallery = ({ images, thumbs }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const lensSize = 100;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - left) / width) * 100;
    const yPercent = ((e.clientY - top) / height) * 100;

    const x = e.clientX - left - lensSize / 2;
    const y = e.clientY - top - lensSize / 2;

    setZoomStyle({
      transform: "scale(2.5)",
      transformOrigin: `${xPercent}% ${yPercent}%`,
    });

    setLensPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
    setIsZoomed(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 justify-center md:justify-start mt-4 md:mt-0 order-2 md:order-1">
        {thumbs.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(images[index])}
            className={`border rounded-md overflow-hidden ${selectedImage === images[index]
              ? "border-gray-800"
              : "border-gray-300"
              }`}
          >
            <Image
              src={ImageUrl(thumb)}
              alt={`Thumb ${index + 1}`}
              width={80}
              height={100}
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div
        className="relative w-full flex-1 cursor-crosshair overflow-hidden order-1 md:order-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={`https://cdn.superbazaar.in/${selectedImage}`}
          alt="Product"
          width={600}
          height={500}
          className={`rounded-md  max-h-[700px] transition-transform duration-100 ${isZoomed ? "scale-150" : ""
            }`}
          style={zoomStyle}
        />

        {isZoomed && (
          <div
            className="absolute border-2 border-gray-800 shadow-md pointer-events-none"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
