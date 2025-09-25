import { Kumbh_Sans } from 'next/font/google'
import FooterLayout from './components/Footer/FooterLayout'
import Navbar from './components/Header/Navbar'
import MiniCart from '../theme1/Modals/Cart/MiniCart'
import { getWebSetting } from '@/services/webSetting'
import React from 'react'

const kumbhSans = Kumbh_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-kumbh-sans'
})

const LayoutTheme2 = async ({ children }) => {
    const webSetting = await getWebSetting();

    return (
        <div className={kumbhSans.className}>
            <Navbar webSetting={webSetting} />
            <main>{children}</main>

            <FooterLayout webSetting={webSetting} />
            <MiniCart />
        </div>
    )
}

export default LayoutTheme2
