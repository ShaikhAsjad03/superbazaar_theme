"use client";
import { Facebook, Twitter, Pinterest, MessageCircle, Copy, X } from "lucide-react"
import Link from "next/link";
const SharePopup = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer mt-5 border border-zinc-600  rounded-lg p-3"
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
          }}
        >
          <p className="text-sm text-gray-600 break-words mb-3 flex-1">{url}</p>
          <Copy className=" text-gray-700 hover:text-black transition" />
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-5">Share</h3>
        <div className="flex gap-4 mt-4">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            className="text-zinc-900 hover:text-blue-600 transition"
          >
            <Facebook size={22} />
          </Link>

          <Link
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
            className="text-zinc-900 hover:text-sky-500 transition"
          >
            <Twitter size={22} />
          </Link>

          <Link
            href={`https://api.whatsapp.com/send?text=${url}`}
            target="_blank"
            className="text-zinc-900 hover:text-green-700 transition"
          >
            <MessageCircle size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
