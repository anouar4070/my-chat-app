import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { NextAuthConfig } from "next-auth"

 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({user, token}) {
      if (user) {
//         console.log({user})
//         {
//   user: {
//     id: 'cmbte5al50000uk00dkt0i4jn',
//     name: 'anouar4070',
//     email: 'g.anouar@yahoo.com',
//     emailVerified: null,
//     passwordHash: null,
//     image: 'https://avatars.githubusercontent.com/u/159817067?v=4',
//     profileComplete: false
//   }
// }
token.profileComplete = user.profileComplete
      }
      return token;
    },

    async session({token, session}) {
if(token.sub && session.user) {
  session.user.id = token.sub;
  session.user.profileComplete = token.profileComplete as boolean;
}
      //console.log({token});
      //console.log({session});

      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
} as NextAuthConfig)

/**
     console.log({token});
      console.log({session});
      
  {
  token: {
    name: 'bob',
    email: 'b@b.com',
    picture: null,
    sub: 'cmaselctb0000ukcs2f7msb9c',
    iat: 1747770241,
    exp: 1750362241,
    jti: 'ec56200e-758b-4403-82b6-42a520c0d6e4'
  }
}
{
  session: {
    user: { name: 'bob', email: 'b@b.com', image: null },
    expires: '2025-06-19T19:46:14.033Z'
  }
}
 */