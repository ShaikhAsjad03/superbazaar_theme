import { getMenu, getCurrency } from "@/services/layout"
import NavbarClient from "./components/NavbarClient"
const Navbar = async () => {
    const [Menudata, currencyData] = await Promise.all([getMenu(), getCurrency()]);
    return (
        <NavbarClient Menudata={Menudata} currencyData={currencyData} />
    )
}
export default Navbar