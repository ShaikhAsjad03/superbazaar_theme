"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPolicies, getPoliciesDetail } from "@/services/cmsService";
import { usePathname } from "next/navigation";

const Tabs = ({ url }) => {
    const [policies, setPolicies] = useState([]);
    const [policesDetail, setpolicesDetail] = useState([])
    const pathname = usePathname();
    const fetchData = async () => {
        const [polices, policesDetail] = await Promise.all([getPolicies(), getPoliciesDetail(url)]);
        setPolicies(polices?.data || []);
        setpolicesDetail(policesDetail?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-7 md:flex">
            <ul className="flex flex-col space-y-3 text-base font-medium md:me-6 mb-6 md:mb-0 w-60">
                {policies.map((tab) => {

                    const lastSegment = pathname.split("/").filter(Boolean).pop();

                    const isActive = tab.url && lastSegment === tab.url;
                    return (
                        <li key={tab.title}>
                            <Link
                                href={tab.url || "#"}
                                className={`group inline-flex items-center px-3 py-3 w-full rounded-lg border-b ${isActive
                                    ? "text-white bg-zinc-900 border-zinc-900 font-normal"
                                    : "text-zinc-900 border-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                                    }`}
                            >
                                {tab.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="p-6  rounded-xl w-full bg-white">
                <div dangerouslySetInnerHTML={{ __html: policesDetail?.description }}></div>
            </div>
        </div>
    );
};

export default Tabs;
