import { LoginSchema } from "@/features/auth/schemas";
import { API_URL } from "@/lib/constants";
import { User } from "@/types/user";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;

            const res = await fetch(`${API_URL}/user/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                deviceType: "web",
                deviceToken: "",
              }),
            });

            if (res.ok) {
              const json = await res.json();

              const user: User = json.data;
              const token = json.token;

              return {
                ...user,
                id: user.id.toString(),
                image: user.profilePicture,
                name: `${user.firstName} ${user.lastName}`,
                token,
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
