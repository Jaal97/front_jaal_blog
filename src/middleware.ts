export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard/:path*",
        "/posts/:path*",
        "/createdpost"
    ],
}