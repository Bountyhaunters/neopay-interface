import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import { Toaster } from "react-hot-toast";
import Wagmi from "./components/Connect/wagmi";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Neopay - Simply Scan and Pay",
  description:
    "Neopay - Scan and pay with ease send in any token and recieve in your choice of token",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Wagmi>
          <Toaster position="bottom-center" reverseOrder={false} />
          <Navbar />
          {children}
          <Footer />
        </Wagmi>
      </body>
    </html>
  );
}
