import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id to the user object
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Ensure the User type includes id
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add id to the JWT token
  }
}