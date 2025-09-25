import DetailPageImageData from "@/data/DetailPageImageData"

const StaticImage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {DetailPageImageData.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 object-contain mb-3"
          />
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default StaticImage
