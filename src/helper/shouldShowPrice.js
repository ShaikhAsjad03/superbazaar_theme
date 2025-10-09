// const shouldShowPrice = (userToken, website) => {
//     if (userToken) return true;
//     if (!userToken && website?.showPrice === false) return true;
//     return false;
// };

// export default shouldShowPrice;
const shouldShowPrice = (userToken, webSetting) => {
    // If user is logged in, always show price
    if (userToken) return true;

    // If website settings allow showing price without login
    if (webSetting?.showPrice) return true;

    // Otherwise, don't show price
    return false;
};

export default shouldShowPrice;
