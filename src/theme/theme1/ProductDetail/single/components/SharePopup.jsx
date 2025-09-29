"use client";
import { Facebook, Twitter, MessageCircle, Copy, Check, X } from "lucide-react"; 
import { useState } from "react";

const SharePopup = ({ isOpen, onClose, url,  CopyUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;


  const handleFacebookShare = () => {
    const shareUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/public/shareproduct/${url}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/public/shareproduct/${url}`;
    const tweet = encodeURIComponent(`${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${CopyUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X className="w-5 h-5 text-gray-700 hover:text-black" />
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer mt-5 border border-zinc-600 rounded-lg p-3"
          onClick={handleCopy}
        >
          <p className="text-sm text-gray-600 break-words mb-3 flex-1">
            {`${process.env.NEXT_PUBLIC_DOMAIN}${CopyUrl}`}
          </p>
          {copied ? (
            <Check className="text-green-600 transition" />
          ) : (
            <Copy className="text-gray-700 hover:text-black transition" />
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-5">Share</h3>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleFacebookShare}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <Facebook size={22} />
          </button>
          <button
            onClick={handleTwitterShare}
            className="text-sky-500 hover:text-sky-700 transition"
          >
            <Twitter size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
