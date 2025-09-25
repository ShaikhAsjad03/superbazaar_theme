import Footer from "./components/common/Footer"
import Navbar from "./components/common/Header/Navbar"
import ModalManager from "./Modals/Auth/ModalManager"
import MiniCart from "./Modals/Cart/MiniCart"
import { Roboto } from "next/font/google"
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const LayoutTheme1 = ({ children, theme }) => {
    return (
        <div className={roboto.className}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ModalManager />
            <MiniCart />

        </div>
    )
}
export default LayoutTheme1