import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Add a custom 'profileComplete' boolean field to the User object
  interface User {
    profileComplete: boolean;
  }

  // Extend the Session interface to include 'profileComplete' from User
  interface Session {
    user: {
      profileComplete: boolean;
    } & DefaultSession["user"]; // Keep all default user properties (name, email, etc.)
  }
}

// Extend the JWT interface from NextAuth to include custom fields
declare module "next-auth/jwt" {
        // Add 'profileComplete' to the JWT payload
  interface JWT {
    profileComplete: boolean;
  }
}
