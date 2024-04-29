import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                userName: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                //peticion HTTP
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            userName: credentials?.userName,
                            password: credentials?.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const user = await res.json();
                // console.log(user);
                
                if (user.error) throw user;

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
      },
    pages: {
        signIn: "/login",
    },
    
})


export { handler as GET, handler as POST, CredentialsProvider};