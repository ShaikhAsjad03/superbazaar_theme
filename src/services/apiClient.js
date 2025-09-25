import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const createServerAxios = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}api`,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export const createClientAxios = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}api`,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
