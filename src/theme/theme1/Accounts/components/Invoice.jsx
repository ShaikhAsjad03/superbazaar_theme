"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getOrderDetails } from "@/services/accountsService";
import { useSelector } from "react-redux";
import { ImageUrl } from "@/helper/imageUrl";
import Image from "next/image";
import PriceConverter from "@/components/PriceConverter";
import "./style/invoice.css"
export default function Invoice({ orderId }) {
  const { webSetting } = useSelector((state) => state.webSetting);
  const invoiceRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderDetails(orderId);
      if (res.isSuccess) {
        setData(res.data);
      }
    };
    fetchOrder();
  }, [orderId]);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${data.orderId}.pdf`);
  };

  return (
    <div className="p-6">
      <div ref={invoiceRef} className="invoice-container">
        <div className="invoice-header">
          <div className="company-info">
            {webSetting?.headerLogo && (
              <Image
                height={48}
                width={150}
                src={ImageUrl(webSetting.headerLogo)}
                alt="Company Logo"
              />
            )}
            <p>{webSetting?.address}</p>
            <p>Email: {webSetting?.email}</p>
            <p>
              Phone: {webSetting?.domesticNumber || webSetting?.interNationalNumber}
            </p>
          </div>
          <div className="invoice-title">
            <h2>INVOICE</h2>
            <p>Order ID: {data.orderId}</p>
            <p>Date: {data.orderDate}</p>
            <p>Status: {data.status}</p>
          </div>
        </div>

        <div className="invoice-section">
          <div>
            <h3>Billing Address:</h3>
            <p>{data.billingAddress?.fullName}</p>
            <p>{data.billingAddress?.address1}</p>
            <p>
              {data.billingAddress?.city}, {data.billingAddress?.state} -{" "}
              {data.billingAddress?.zipCode}
            </p>
            <p>{data.billingAddress?.country}</p>
            <p>Email: {data.billingAddress?.email}</p>
            <p>Phone: {data.billingAddress?.mobile}</p>
          </div>
          <div>
            <h3>Shipping Address:</h3>
            <p>{data.shippingAddress?.fullName}</p>
            <p>{data.shippingAddress?.address1}</p>
            <p>
              {data.shippingAddress?.city}, {data.shippingAddress?.state} -{" "}
              {data.shippingAddress?.zipCode}
            </p>
            <p>{data.shippingAddress?.country}</p>
          </div>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {data.orderItems &&
              data?.orderItems?.length > 0 &&
              data?.orderItems?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">
                    <PriceConverter price={item.productsnapshots.price || 0} />
                  </td>
                  <td className="text-right">
                    <PriceConverter price={item.productsnapshots.subtotal || 0} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="invoice-totals">
          <div className="invoice-totals-inner">
            <div>
              <span>Subtotal:</span>
              <span>
                <PriceConverter price={data?.subtotal || 0} />
              </span>
            </div>
            <div>
              <span>Shipping:</span>
              <span>
                <PriceConverter price={data?.shippingcharge || 0} />
              </span>
            </div>
            <div>
              <span>Discount:</span>
              <span>
                <PriceConverter price={data?.discount || 0} />
              </span>
            </div>
            <div>
              <span>Tax:</span>
              <span>
                <PriceConverter price={data?.tax || 0} />
              </span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>
                <PriceConverter price={data?.totalAmount || 0} />
              </span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          {webSetting?.headerLogo && (
            <Image
              height={40}
              width={120}
              src={ImageUrl(webSetting.headerLogo)}
              alt="Footer Logo"
              className="footer-logo"
            />
          )}
          <p>{webSetting?.copyRightText}</p>
        </div>
      </div>

      <div className="text-center">
        <button onClick={downloadPDF} className="download-btn">
          Download Invoice
        </button>
      </div>
    </div>
  );
}
