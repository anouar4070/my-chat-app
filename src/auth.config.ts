import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
import { loginSchema } from "./lib/schemas/loginSchema";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !user.passwordHash || !(await compare(password, user.passwordHash)))
            return null;

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;




// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import type { NextAuthConfig } from "next-auth";
// import { getUserByEmail } from "./app/actions/authActions";
// import { compare } from "bcryptjs";
// import { loginSchema } from "./lib/schemas/loginSchema";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default {
//   providers: [
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "credentials",
//       async authorize(creds) {
//         const validated = loginSchema.safeParse(creds);

//         if (validated.success) {
//           const { email, password } = validated.data;

//           const user = await getUserByEmail(email);

//           if (!user || !user.passwordHash || !(await compare(password, user.passwordHash)))
//             return null;

//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account?.provider === "github") {
//         const email = profile?.email;
//         if (!email) return false;

//         const existingUser = await prisma.user.findUnique({
//           where: { email },
//           include: { accounts: true },
//         });

//         if (existingUser) {
//           const githubLinked = existingUser.accounts.some(
//             (acc) => acc.provider === "github"
//           );

//           if (!githubLinked) {
//             // Link GitHub account to user
//             await prisma.account.create({
//               data: {
//                 userId: existingUser.id,
//                 type: account.type,
//                 provider: account.provider,
//                 providerAccountId: account.providerAccountId,
//                 access_token: account.access_token,
//                 refresh_token: account.refresh_token,
//                 expires_at: account.expires_at,
//                 token_type: account.token_type,
//                 scope: account.scope,
//                 id_token: account.id_token,
//                 session_state: account.session_state,
//               },
//             });
//           }

//           return true;
//         }

//         // No existing user: fallback to allow new user creation
//         return true;
//       }

//       return true;
//     },

//     async session({ session, user }) {
//       if (user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
// } satisfies NextAuthConfig;
