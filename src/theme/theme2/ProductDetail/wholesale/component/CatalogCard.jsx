import Link from "next/link";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import WishlistButton from "@/components/cards/attribute/WishlistButton";
import { useSession } from "next-auth/react";
import shouldShowPrice from "@/helper/shouldShowPrice";
import { useDispatch, useSelector } from "react-redux";
import { getWebSetting } from "@/services/webSetting";
import { setWebSetting } from "@/store/slice/webSettingSlice";
import { useEffect } from "react";

const CatalogCard = ({ product, category }) => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const webSetting = useSelector(state => state.webSetting.webSetting)

    const fetchData = async () => {
        const data = await getWebSetting();
        dispatch(setWebSetting(data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow relative group">
                <div className="relative w-full">
                    <Link href={`/catalogue/${category}/${product.url}`}>
                        <div className="block relative w-full">
                            <Image
                                src={ImageUrl(product.coverImage)}
                                alt={product.name}
                                width={1000}
                                height={1500}
                                className="w-full object-cover bg-gray-200"
                                priority
                            />

                            <div className="absolute top-0 right-0 bg-black text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
                                Full Set + Single
                            </div>

                            <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                                3 PCS
                            </div>
                        </div>
                    </Link>

                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishlistButton catalogueId={product.id} type="catalogue" variant="detail" loginMode="page" />
                    </div>
                </div>

                <div className="text-center p-2 bg-gray-50">
                    <h3 className="font-semibold text-xs">
                        <p className="line-clamp-1 text-left">{product.name}</p>
                    </h3>

                    {shouldShowPrice(session?.accessToken, webSetting?.showPrice) ? <div className="flex justify-between mt-2 text-sm">
                        <div className="hidden sm:block">
                            <div><PriceConverter price={product.average_price} /></div>
                            <span className="text-gray-500 text-xs">AVG PRICE</span>
                        </div>
                        <div>
                            <div><PriceConverter price={product.offer_price} /></div>
                            <span className="text-gray-500 text-xs text-center">FULL PRICE</span>
                        </div>
                    </div> : (
                        <Link href="/login"
                            className="text-red-600 font-bold text-center text-xs cursor-pointer"
                        >
                            Login To View Price
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default CatalogCard;
