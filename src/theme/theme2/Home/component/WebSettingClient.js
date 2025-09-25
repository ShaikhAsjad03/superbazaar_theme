"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWebSetting } from "@/services/webSetting";
import { getPolicies } from "@/services/cmsService";
import { getSocialIcon } from "@/services/cmsService";
import { setWebSetting } from "@/store/slice/webSettingSlice";

export default function WebSettingClient({ children }) {
    const dispatch = useDispatch();

    const [webSetting, setWebSettingState] = useState({});

    const fetchData = async () => {
        try {
            const [webData,] = await Promise.all([getWebSetting()]);

            setWebSettingState(webData || {});
            dispatch(setWebSetting(webData || {}));
        } catch (err) {
            console.error("❌ Failed to fetch settings:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {children}
        </>
    );
}
