"use client";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Truncate from "../Common/utils/truncate";
import { usePathname } from "next/navigation";
export function Connect() {
  const pathname = usePathname();
  let [isOpen, setIsOpen] = useState(false);
  const { address, connector, isConnected } = useAccount();

  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      onSuccess(data) {
        setIsOpen(false);
        toast("Wallet Connected", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
      onError(error) {
        toast.error("Wallet Connect Failed", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
    });
  const { disconnect } = useDisconnect();

  return (
    <>
      {isConnected ? (
        <div className="px-4 md:px-8 py-2 rounded-full shadow-sm bg-white/20">
          <div className="flex flex-row items-center justify-center gap-2 w-44">
            <Image
              src={"/neo-icon.png"}
              alt="ENS Avatar"
              width={"15"}
              height={"15"}
            />
            <div>{ensName ? `${ensName}` : Truncate(address, 12, "...")}</div>
            <div onClick={() => disconnect()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <>
          {pathname === "/app" && (
            <button
              className="px-4 text-sm md:text-base md:px-6 py-2 text-white rounded-full bg-primary"
              onClick={() => setIsOpen(true)}
            >
              Connect Wallet
            </button>
          )}
        </>
      )}
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
                {connectors.map((connector, index) => (
                  <li className="w-full" key={connector.id}>
                    <button
                      className="bg-gray-900 px-6 py-1.5 rounded-2xl shadow-sm w-full focus:outline-none"
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                    >
                      {connector.name}{" "}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        " (connecting)"}
                    </button>
                  </li>
                ))}
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
    </>
  );
}
