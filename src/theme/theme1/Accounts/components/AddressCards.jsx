import { SquarePen, Trash2 } from "lucide-react";
export default function AddressList({ addresses, handleEdit, handleDelete }) {
  return (
    <>
      {addresses.map((addr, i) => (
        <div
          key={i}
          className="relative border rounded-xl p-5 shadow-md bg-white transition hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={() => handleEdit(i)}
              type="button"
              className="bg-white border border-gray-300 shadow-sm p-2 rounded-full transition hover:bg-gray-100 hover:scale-110"
            >
              <SquarePen className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => handleDelete(addr.id)}
              type="button"
              className="bg-white border border-gray-300 shadow-sm p-2 rounded-full transition hover:bg-red-100 hover:scale-110"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
          <h2 className="text-lg font-semibold">{addr.fullName}</h2>
          <p className="text-sm text-gray-700">{addr.email}</p>
          <p className="text-sm">{addr.mobile}</p>
          <p className="text-sm">
            {addr.address1}, {addr.address2}
          </p>
          <p className="text-sm text-gray-600">
            {addr.city}, {addr.state}, {addr.country} - {addr.zipCode}
          </p>
        </div>
      ))}
    </>
  );
}
