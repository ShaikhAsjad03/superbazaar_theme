import { getCurrency, getMenu } from "@/services/layout";
import HeaderMenu from "./component/HeaderMenu"

const NavBar = async ({ webSetting }) => {
    const [menudata, currencyData] = await Promise.all([getMenu(), getCurrency()]);
    return (
        <>
            <HeaderMenu menudata={menudata} currencyData={currencyData} webSetting={webSetting} />
        </>
    )
}

export default NavBar