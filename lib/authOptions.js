// app/libs/authOptions.js
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "./db";

const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("No inputs");
                        return null;
                    }
                    const existingUser = await db.user.findUnique({
                        where: { email: credentials.email },
                    });
                    if (!existingUser) {
                        console.log("No user found");
                        return null;
                    }
                    const passwordMatch = await compare(credentials.password, existingUser.hashedPassword);
                    if (!passwordMatch) {
                        console.log("Password does not match");
                        return null;
                    }
                    const user = {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                    };
                    return user;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
};

export { authOptions };
