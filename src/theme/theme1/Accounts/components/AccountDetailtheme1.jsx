"use client";
import { SquarePen, User } from "lucide-react";
import UpdateProfile from "./updateProfile";
import { useState } from "react";

export default function AccountDetailTheme1({ data }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(data);

  return (
    <div className="bg-white shadow rounded-xl p-4 sm:p-6 md:p-8 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">My Profile</h2>
        <div className="flex items-center justify-start sm:justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-black text-black hover:text-white transition"
          >
            <SquarePen className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
          <User className="w-10 h-10 text-zinc-400" />
        </div>
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm sm:text-base text-zinc-900">
            <p className="col-span-1 sm:col-span-2 break-words">
              <span className="font-medium">Full Name :</span> {userData?.name}
            </p>
            <p className="col-span-1 break-words">
              <span className="font-medium">Mobile No :</span> {userData?.mobile_number}
            </p>
            <p className="col-span-1 sm:col-span-3 break-words">
              <span className="font-medium">Email ID :</span> {userData?.email}
            </p>

            <p className="col-span-1 sm:col-span-3 break-words">
              <span className="font-medium">User Type :</span> {userData?.type}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4 border-zinc-300" />
      <UpdateProfile
        open={open}
        onClose={() => setOpen(false)}
        user={userData}
        userId={data.id}
        onUpdate={(updated) => setUserData(updated)}
      />
    </div>
  );
}
