"use client";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import OTPModal from "./OTPModal";
import ConfirmPasswordModal from "./ConfirmPasswordModal";

export default function ModalManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkExpiry = () => {
      const expiry = localStorage.getItem("otp_expiry");
      if (expiry && Date.now() > Number(expiry)) {
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        localStorage.removeItem("otp_expiry");
      }
    };
    checkExpiry();
    const interval = setInterval(checkExpiry, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LoginModal />
      <SignupModal />
      <ForgetPasswordModal />
      <OTPModal />
      <ConfirmPasswordModal />
    </>
  );
}
