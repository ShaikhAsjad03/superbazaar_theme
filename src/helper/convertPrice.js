export const convertPrice = (price, currency) => {

  if (!currency?.rate || !currency?.symbol) return `${price.toFixed(2)}`; 
  const converted = price / currency.rate;
  return `${currency.symbol} ${converted.toFixed(2)}`;
};