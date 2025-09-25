"use client";
import { ImageUrl } from "@/helper/imageUrl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TwoBanner = ({ data, htmlContent }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div
      className="mx-auto px-4 mt-10 w-full
      sm:max-w-[680px] 
      md:max-w-[980px] 
      lg:max-w-[980px] 
      xl:max-w-[1280px] 
      2xl:max-w-[1320px]"
    >
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl group h-[300px] sm:h-[450px] md:h-[500px] lg:h-[660px]"
            >
              <img
                src={ImageUrl(item.image)}
                alt={item?.title || ""}
                className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className={`absolute bottom-6 left-6 right-6 max-w-[85%] transition-all duration-700 ${animate
                  ? "opacity-100 translate-y-0"
                  : index === 1
                    ? "opacity-0 -translate-y-6"
                    : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >

              </div>
            </div>
          ))}
        </div>
      ) : htmlContent ? (
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : null}
    </div>
  );
};

export default TwoBanner;
