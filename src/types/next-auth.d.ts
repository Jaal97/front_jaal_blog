import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      id: string;
      role: string;
      userName: string;
      image: string;
    };
  }
}