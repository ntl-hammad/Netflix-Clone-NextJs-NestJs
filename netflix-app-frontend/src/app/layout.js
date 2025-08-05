import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Netflix Clone by Hammad",
  description: "Netflix Clone by Hammad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
