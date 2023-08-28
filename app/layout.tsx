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

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_BRAND_NAME} - Simply Scan and Pay`,
  description: `${process.env.NEXT_PUBLIC_BRAND_NAME} - Scan and pay with ease send in any token and recieve in your choice of token`,
  openGraph: {
    title: "NeoPay - Simply Scan and Pay",
    url: "https://neopay-interface.vercel.app/",
    description: `${process.env.NEXT_PUBLIC_BRAND_NAME} - Scan and pay with ease send in any token and recieve in your choice of token`,
    images: [
      {
        url: "https://neopay-interface.vercel.app/og/neopay-og.png",
        secureUrl: "https://neopay-interface.vercel.app/og/neopay-og.png",
        alt: "NeoPay - Simply Scan and Pay",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: "https://neopay-interface.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoPay - Simply Scan and Pay",
    description: `${process.env.NEXT_PUBLIC_BRAND_NAME} - Scan and pay with ease send in any token and recieve in your choice of token`,
    creator: "@NeoPay",
    images: ["https://neopay-interface.vercel.app/og/neopay-og.png"],
  },
  robots: {
    index: true,
  },
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
