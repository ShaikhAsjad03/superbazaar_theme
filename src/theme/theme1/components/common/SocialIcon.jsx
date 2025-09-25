import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Globe,
  Youtube,
} from "lucide-react";

const ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  pinterest: Globe,
  youtube: Youtube,
};

const BG_COLORS = {
  facebook: "bg-blue-600 hover:bg-blue-700",
  twitter: "bg-sky-500 hover:bg-sky-600",
  instagram: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
  pinterest: "bg-red-600 hover:bg-red-700",
  youtube: "bg-red-500 hover:bg-red-600",
};

const SocialIcon = ({ socialMedia }) => {
  return (
    <div className="flex gap-3 mt-4">
      {socialMedia?.map((media, index) => {
        const Icon = ICONS[media.name.toLowerCase()];
        const bgColor =
          BG_COLORS[media.name.toLowerCase()] ||
          "bg-gray-500 hover:bg-gray-600";

        return (
          <a
            key={index}
            href={media.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-colors duration-200 ${bgColor}`}
          >
            {Icon && <Icon size={18} />}
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcon;
