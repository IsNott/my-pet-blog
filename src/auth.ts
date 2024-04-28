import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/dataDefinition";
import pool from "@/app/public/db";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const [row] = await pool.query(
      `SELECT * FROM users WHERE email='${email}'`,
    );
    const users: User[] = row as User[];
    return users[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log(passwordsMatch, user);
          if (passwordsMatch) {
            // console.log("user", user);
            return {
              ...user,
              id: user.id,
              image: user.avatar_url,
            };
          }
        }
        return null;
      },
    }),
  ],
});
