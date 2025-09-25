"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { loginSchema } from "@/schema/schema";
import { signIn, useSession } from "next-auth/react";


export default function LoginModal() {
  const { data: session, } = useSession();
  const { modal, close, open } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const initialValues = { email: "", password: "" };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoginError("");
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        setLoginError("Invalid email or password");
      } else {
        const session = await fetch("/api/auth/session").then(r => r.json());
        if (session?.accessToken) {
          localStorage.setItem("token", session.accessToken);
        }
        close("login")
      }
    },
  });

  useEffect(() => {
    if (!modal.login) {
      formik.resetForm();
      setShowPassword(false);
      setLoginError("");
    }
  }, [modal.login]);

  if (!modal.login) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
        onClick={() => close("login")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-lg p-8 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("login")}
        >
          ✕
        </button>

        <h2 className="text-2xl font-normal mb-6 text-left">Login</h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="email"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="password"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>
          {loginError && <p className="text-xs text-red-600">{loginError}</p>}

          <p
            onClick={() => {
              close("login");
              open("forget");
            }}
            className="flex flex-row mt-3 underline text-zinc-950 hover:text-red-600 font-normal cursor-pointer"
          >
            Forget Password <ArrowUpRight size={14} className="mt-1" />
          </p>

          <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-zinc-900 text-white py-2 rounded-sm hover:bg-black transition-colors duration-200"
            >
              Login
            </button>

            <p className="text-sm text-gray-600 text-center sm:text-left cursor-pointer">
              <button
                type="button"
                onClick={() => {
                  close("login");
                  open("signup");
                }}
                className="text-zinc-900 font-medium underline hover:text-red-600 flex items-center gap-1"
              >
                New customer? Sign Up <ArrowUpRight size={14} />
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
