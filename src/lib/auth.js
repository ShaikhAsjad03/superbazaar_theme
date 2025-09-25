import CredentialsProvider from "next-auth/providers/credentials";
import { createClientAxios } from "../services/apiClient";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const axiosInstance = await createClientAxios()
                    const res = await axiosInstance.post(
                        `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
                        { email: credentials.email,password: credentials.password,}
                    );


                    const data = res.data;
                    if (res.status === 200 && data?.token) {
                        return {
                            id: data.payload.id,
                            email: data.payload.email,
                            name: data.payload.name,
                            role: data.payload.type,
                            accessToken: data.token,
                        };
                    }
                    return null;
                } catch (err) {
                    throw new Error(err?.response?.data?.message || "Login failed");

                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.accessToken = token.accessToken;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
        error: '/',
    }
};
