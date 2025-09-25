"use client";
import { useState } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import WishlistButton from "@/components/cards/attribute/WishlistButton";
import Link from "next/link";

const ProductImageGallery = ({ images, thumbs, product_id }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleFancyBox = (startIndex) => {
    Fancybox.show(
      images.map((img) => ({
        src: `https://cdn.superbazaar.in/${img}`,
        type: "image",
      })),
      {
        Thumbs: { autoStart: true },
        startIndex,
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4">
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {thumbs.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(images[index])}
            className={`border rounded-md overflow-hidden ${selectedImage === images[index]
              ? "border-dashed border-gray-800"
              : "border-gray-300"
              }`}
          >
            <Image
              src={`https://cdn.superbazaar.in/${thumb}`}
              alt={`Thumb ${index + 1}`}
              width={80}
              height={100}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative w-full flex-1 cursor-pointer order-1 md:order-2">
        <div className="mt-3 absolute top-3 right-3 z-10">
          <WishlistButton
            productId={product_id}
            type="product"
            variant="detail"
            loginMode="page"
          />
        </div>

        <Link
          href={`https://cdn.superbazaar.in/${selectedImage}`}
          data-fancybox="gallery"
          onClick={(e) => {
            e.preventDefault();
            handleFancyBox(images.indexOf(selectedImage));
          }}
        >
          <Image
            src={`https://cdn.superbazaar.in/${selectedImage}`}
            alt="Product"
            width={600}
            height={500}
            className="w-full h-auto rounded transition-transform duration-200 ease-out"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductImageGallery;
