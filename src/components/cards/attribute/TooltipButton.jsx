import React from "react";
const TooltipButton = ({ icon: Icon, label, onClick, delay }) => {
  return (
    <div
      className={`relative group/icon flex items-center justify-center 
                  transform translate-y-4 opacity-0 transition-all duration-500 
                  group-hover:translate-y-0 group-hover:opacity-100`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={onClick}
        className="p-2 rounded-full bg-white text-gray-700 shadow-md 
                   transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg"
        aria-label={label}
      >
        <Icon size={20} />
      </button>
      <span
        className="absolute right-full mr-2 top-1/2 -translate-y-1/2 
                   scale-0 group-hover/icon:scale-100 opacity-0 
                   group-hover/icon:opacity-100 transition-all duration-300 
                   bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10"
      >
        {label}
      </span>
    </div>
  )
}

export default TooltipButton;
