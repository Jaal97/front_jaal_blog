import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionAuthProvider from "../context/SessionAuthProvider";
import Footer from '../components/Footer'


const inter = Inter({ subsets: ["latin"] });

// let token = session?.user?.token;
// if (token) {
//   let us = JSON.parse(atob(token.split('.')[1]));
//   return us;
// }

export const metadata: Metadata = {
  title: "Jaal Blog",
  description: "Videojuegos, Series y mucho más",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <main className="h-screen">
          <SessionAuthProvider>
            <Navbar />

            {children}
            <div className="">
              <Footer />
            </div>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
