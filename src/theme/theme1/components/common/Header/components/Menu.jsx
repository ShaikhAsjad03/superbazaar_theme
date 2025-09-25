import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
const Menu = ({ Menudata }) => {
  const { webSetting } = useSelector((state) => state.webSetting)
  return (
    <div className="justify-center items-center mt-3 hidden sm:flex">
      <ul className="flex direction-row gap-3">
        {Menudata && Menudata.length > 0 && Menudata.map((item) => (
          <li key={item.id} className="relative group">
            <Link
              href={item.url === "wholesale"
                ? "/wholesale" : webSetting?.purchaseType === "wholesale"
                  ? `/wholesale/${item.url}`
                  : `/retail/${item.url}`}
              className="flex items-center gap-1 px-3 py-2 text-black-900 hover:text-red-400 font-normal transition-colors" >
              {item.name}
              {item?.children && item.children.length > 0 && (
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-180 mt-1" />)}
            </Link>


            {item?.children && item.children.length > 0 && (
              <div
                className="absolute left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white shadow-lg rounded-md mt-2 z-50 min-w-[200px]" >
                <ul className="py-2">
                  {item.children[0].children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`${webSetting?.purchaseType === "wholesale" ? `/wholesale/${child.url}` : `/retail/${child.url}`}`}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-400 transition-colors">
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
        {Menudata && Menudata.length > 0 && <li>
          <Link
            href={webSetting?.purchaseType === "wholesale" ? `/brand` : `/brand`}
            className="flex items-center gap-1 px-3 py-2 text-black-900 hover:text-red-400 font-normal transition-colors"
          >
            Brand
          </Link>
        </li>}
      </ul>
    </div>
  )
}

export default Menu

