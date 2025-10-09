"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderNavigation = ({
  position = "center",
  prevClass = "swiper-button-prev",
  nextClass = "swiper-button-next",
}) => {
  return (
    <>
      <div
        className={`
          absolute top-1/2 z-10 -translate-y-1/2
          left-2 
          md:-left-4  
          ${position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""}
        `}
      >
        <button
          className={`${prevClass} bg-white lg:p-2  rounded-full shadow-md hover:bg-gray-100`}
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div
        className={`
          absolute top-1/2 z-10 -translate-y-1/2
          right-2 
          md:-right-4 
          ${position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""}
        `}
      >
        <button
          className={`${nextClass} bg-white  lg:p-2 rounded-full shadow-md hover:bg-gray-100`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </>
  );
};

export default SliderNavigation;


// "use client";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const SliderNavigation = ({ position = "center", prevClass, nextClass }) => {
//   return (
//     <>
//       <div
//         className={`
//           absolute top-1/2 z-10 -translate-y-1/2
//           left-2 
//           md:-left-4  
//           ${position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""}
//         `}
//       >
//         <button
//           type="button"
//           className={`${prevClass} bg-white lg:p-2 rounded-full shadow-md hover:bg-gray-100`}
//         >
//           <ChevronLeft size={24} />
//         </button>
//       </div>

//       <div
//         className={`
//           absolute top-1/2 z-10 -translate-y-1/2
//           right-2 
//           md:-right-4 
//           ${position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""}
//         `}
//       >
//         <button
//           type="button"
//           className={`${nextClass} bg-white lg:p-2 rounded-full shadow-md hover:bg-gray-100`}
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>
//     </>
//   );
// };

// export default SliderNavigation;
