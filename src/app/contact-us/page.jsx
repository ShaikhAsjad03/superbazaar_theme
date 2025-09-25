// src/app/contact/page.jsx
import ContactClient from "@/components/ContactClient";
import { getWebSetting } from "@/services/webSetting";


export default async function ContactPage() {
    const webSetting = await getWebSetting();
    return <ContactClient webSetting={webSetting} />;
}
