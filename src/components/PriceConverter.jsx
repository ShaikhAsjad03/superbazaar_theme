"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PriceConverter = ({ price }) => {
  const { list, selected } = useSelector((state) => state.currency);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) {
    return <span>{price}</span>;
  }

  if (!selected) return <span>{price}</span>;

  const currencyData = list.find((c) => c.code === selected.code);
  const currencyRate = currencyData ? currencyData.rate : 1;
  const convertedPrice = price / currencyRate;

  return (
    <span>
      {selected.symbol}&nbsp;
      {convertedPrice.toFixed(2)}
    </span>
  );
};

export default PriceConverter;
