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
    </div>
  );
}
