"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { Connect } from "../Connect/connect";
import Link from "next/link";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const logo = process.env.NEXT_PUBLIC_BRAND_LOGO || "/neopay-logo.png";

  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change Background
    window.addEventListener("scroll", changeBackground);
  });
  return (
    <>
      <div className="z-50 hidden w-full md:block md:fixed">
        <div
          className={
            navbar
              ? "mx-6 md:mx-12 mt-4 py-2  text-white rounded-full bg-black/80 shadow-2xl"
              : "mx-6 md:mx-12 mt-4 py-2 text-white rounded-full bg-black/60"
          }
        >
          <div className="flex flex-row items-center justify-between px-8 py-2">
            <Link href="/">
              <img src={logo} alt="logo" height="150" width="150" />
            </Link>
            <ul className="flex-row items-center justify-center hidden space-x-12 text-lg uppercase md:flex">
              <li>
                <Connect />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-6 md:mx-12 mt-4 py-4 px-6  text-white rounded-full bg-black/80 shadow-2xl flex flex-row gap-2 justify-between items-center md:hidden">
        <Link href="/">
          <img src={logo} alt="logo" height="120" width="120" />
        </Link>
        <Connect />
      </div>
    </>
  );
}
