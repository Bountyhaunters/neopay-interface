"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

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
              ? "mx-6 md:mx-12 mt-4  text-white rounded-full nav-scroll-active shadow-2xl"
              : "mx-6 md:mx-12 mt-4  text-white rounded-full bg-black"
          }
        >
          <div className="flex flex-row items-center justify-between px-8 py-5">
            <a href="#home">
              <Image
                src="/neopay-logo.png"
                alt="Neopay Logo"
                height="150"
                width="150"
              />
            </a>
            <ul className="flex-row items-center justify-center hidden space-x-12 text-lg text-primary uppercase md:flex">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
