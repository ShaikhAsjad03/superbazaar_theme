"use client";

import { ImageUrl } from "@/helper/imageUrl";
import React from "react";

const MoreColors = ({ moreColors = [], basepath}) => {
  if (!moreColors.length) return null;

  return (
    <div className="mt-1">
      <div className="flex gap-3 flex-wrap">
        {moreColors.map((color) => (
          <a
            key={color.id}
            href={`/retail/${basepath}/${color.url}`} 
            className="group relative w-15 h-15 rounded-full overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            title={color.sku} 
          >
            <img
              src={ImageUrl(color.thumbImage[0])}
              alt={color.sku}
              className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0  bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MoreColors;
