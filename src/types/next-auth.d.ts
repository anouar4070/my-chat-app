import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Add a custom 'profileComplete' boolean field to the User object
  interface User {
    profileComplete: boolean;
    role: Role;
  }

  // Extend the Session interface to include 'profileComplete' from User
  interface Session {
    user: {
      profileComplete: boolean;
      role: Role;
    } & DefaultSession["user"]; // Keep all default user properties (name, email, etc.)
  }
}

// Extend the JWT interface from NextAuth to include custom fields
declare module "next-auth/jwt" {
        // Add 'profileComplete' to the JWT payload
  interface JWT {
    profileComplete: boolean;
    role: Role;
  }
}
