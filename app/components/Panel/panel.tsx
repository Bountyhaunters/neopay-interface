"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

export default function Panel(props: any) {
  // The open/closed state lives outside of the Dialog and is managed by you
  let [isOpen, setIsOpen] = useState(false);

  function handleDeactivate() {
    // ...
  }

  return (
    <div className="">
      {" "}
      <div className="bg-black/60 text-white w-full p-8 shadow-md rounded-3xl gap-6 flex flex-col">
        <div className="flex flex-col justify-start items-start">
          <Image
            src={props.image}
            width={100}
            height={100}
            alt={props.buttonText}
          />
        </div>
        <div>
          <p>{props.content}</p>
        </div>
        <div className="flex justify-start">
          <div
            className="bg-primary px-6 py-2 rounded-full flex flex-row justify-center items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={props.buttonIcon}
              alt={props.buttonText}
              height={"20"}
              width={"20"}
            />
            <button>{props.buttonText}</button>
          </div>
        </div>
      </div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 bg-black"
        >
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black/60">
            <Dialog.Panel className="relative flex flex-col items-center justify-center w-full max-w-md gap-4 p-4 mx-4 rounded-3xl bg-primary">
              <Dialog.Title className="text-lg">
                Connect Your Wallet
              </Dialog.Title>
              <ul className="flex flex-col items-center justify-center w-full gap-2">
                Hello
              </ul>

              <div
                className="absolute top-4 right-4"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
