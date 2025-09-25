"use client"
import { useEffect, useState } from "react";

function HomeTabs({ productBlocks, webSetting }) {
    const [productTabsData, setProductTabsData] = useState([]);

    useEffect(() => {
        if (!productBlocks || !webSetting) return;

        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    productBlocks.map(async (block) => {
                        const products = await getHomeProductlist(
                            block.category?.url,
                            webSetting?.purchaseType
                        );
                        return {
                            title: block.title,
                            url: block.category?.url,
                            products,
                        };
                    })
                );

                setProductTabsData(results);
            } catch (err) {
                console.error("Error fetching product tabs:", err);
            }
        };

        fetchData();
    }, [productBlocks, webSetting]);

    return (
        <div>
            {productTabsData.map((tab, idx) => (
                <div key={idx}>
                    <h2>{tab.title}</h2>
                    <pre>{JSON.stringify(tab.products, null, 2)}</pre>
                </div>
            ))}
        </div>
    );
}
export default HomeTabs;