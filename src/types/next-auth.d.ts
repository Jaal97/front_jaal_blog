import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      userName: string;
      image: string;
    };
  }
}