"use client";

import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import QRCode from "react-qr-code";
import { Tokens, getPoolDetails, getTokenDetails } from "../Common/utils/data";
import { erc20ABI, useAccount } from "wagmi";
import toast from "react-hot-toast";
import Truncate from "../Common/utils/truncate";
import Link from "next/link";
import StackOSABI from "../Common/utils/abi/STACKOS.json";
import POOLABI from "../Common/utils/abi/POOL.json";
import { useContractWrite } from "wagmi";

interface Data {
  amount: number;
  chainId: number;
  tokenAddress: string;
  userAddress: string;
}

export default function Card() {
  const { address, isConnected } = useAccount();

  const [data, setData] = useState<Data>();
  const [scanned, setScanned] = useState(false);
  const [qrdata, setQRData] = useState<Data>();
  const [amount, setAmount] = useState<number>();
  const [token, setToken] = useState<string>(
    "0x4e228A23dC6B3167757C73C585311A59833DEb7c"
  );
  const [sendertoken, setSenderToken] = useState<string>(
    "0xEB0dbA59d17d2016B08B9C9E23D51BbBE7289519"
  );
  const [showqr, setShowqr] = useState<boolean>(false);

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    write: appoveWrite,
  } = useContractWrite({
    address: data?.tokenAddress! as `0x${string}`,
    abi: erc20ABI,
    functionName: "approve",
  });

  const {
    data: swapData,
    isLoading: swapLoading,
    isSuccess: swapSuccess,
    write: swapWrite,
  } = useContractWrite({
    address: getPoolDetails(data?.tokenAddress!, qrdata?.tokenAddress!)?.Pool! as `0x${string}`,
    abi: POOLABI.abi,
    functionName: "swap",
  });

  const generateQR = () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter the amount");
      return;
    }
    if (!address) {
      toast.error("Connect your wallet");
      return;
    }
    setQRData({
      amount: amount * 10 ** 18,
      chainId: 2970385,
      tokenAddress: token || "",
      userAddress: address,
    });
    setShowqr(true);
  };

  async function Transfer() {
    appoveWrite({
    args: [
      getPoolDetails(data?.tokenAddress!, qrdata?.tokenAddress!)?.Pool! as `0x${string}`,
      BigInt(data?.amount!),
    ],
    });
    swapWrite({
      args: [
        data?.tokenAddress!,
        qrdata?.userAddress!,
        BigInt(data?.amount!),
      ]
    })
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-lg bg-black/60 rounded-xl shadow-md w-full text-white px-12 py-8">
      <Tab.Group>
        <Tab.List className="grid grid-cols-2 w-full">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "bg-primary px-4 py-1.5 rounded-md shadow-md focus:outline-none flex justify-center items-center gap-2"
                    : "bg-transparent px-4 py-1.5 focus:outline-none flex justify-center items-center gap-2"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
                Pay
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "bg-primary px-4 py-1.5 rounded-md shadow-md focus:outline-none flex justify-center items-center gap-2"
                    : "bg-transparent px-4 py-1.5 focus:outline-none flex justify-center items-center gap-2"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                  />
                </svg>
                Recieve
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className={"w-full"}>
          <Tab.Panel className={"w-full"}>
            {!scanned ? (
              <QrReader
                onResult={(result: any, error) => {
                  if (!!result) {
                    const txData = JSON.parse(result?.getText());
                    setData(txData);
                    setScanned(true);
                    toast.success("QR Scanned successfully");
                  }

                  if (!!error) {
                    console.log(error);
                  }
                }}
                className="w-full aspect-square"
                videoStyle={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "1px",
                }}
                constraints={{ aspectRatio: 1 / 1, facingMode: "environment" }}
              />
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-4">
                  <h3 className="flex flex-row gap-2 font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                    Amount:
                    <span>
                      {data?.amount || 0}{" "}
                      {getTokenDetails(data?.tokenAddress || "")?.ticker}
                    </span>
                  </h3>
                  <h3 className="flex flex-row gap-2 font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Address:{" "}
                    <Link
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                      href={
                        "https://evm.ngd.network/address/" + data?.userAddress
                      }
                    >
                      {Truncate(data?.userAddress, 16, "...")}
                    </Link>
                  </h3>

                  <div className="flex flex-col gap-2">
                    <label className="w-full text-sm" htmlFor="chains">
                      Select a Token to Pay
                    </label>
                    <select
                      className="w-full bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mb-2 text-base input"
                      name="tokens"
                      id="tokens"
                      onChange={(e) => setSenderToken(e.target.value)}
                    >
                      {Tokens.reverse().map((token, i) => {
                        return (
                          <option key={i} value={token.address}>
                            {token.ticker}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {isConnected ? (
                  <button
                    className="bg-primary px-6 py-2 rounded-md shadow-md font-bold flex flex-row justify-center items-center gap-2"
                    onClick={() => Transfer()}
                  >
                    Transfer
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                ) : (
                  <>
                    {" "}
                    <button
                      className="bg-black/20 px-6 py-2 rounded-md shadow-md font-bold flex flex-row justify-center items-center gap-2 cursor-not-allowed"
                      disabled={true}
                    >
                      Connect Wallet
                    </button>
                  </>
                )}
                <button onClick={() => setScanned(false)}>Cancel</button>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel className="w-full">
            {!showqr ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="w-full text-sm" htmlFor="chains">
                    Enter the amount
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-base"
                    placeholder="Ex: 100"
                    onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-full text-sm" htmlFor="chains">
                    Select a Token
                  </label>
                  <select
                    className="w-full bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mb-2 text-base input"
                    name="tokens"
                    id="tokens"
                    onChange={(e) => setToken(e.target.value)}
                  >
                    {Tokens.map((token, i) => {
                      return (
                        <option key={i} value={token.address}>
                          {token.ticker}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {isConnected ? (
                  <button
                    className="w-full bg-primary rounded-md shadow-sm px-8 py-2 text-white text-lg uppercase"
                    onClick={() => generateQR()}
                  >
                    Generate QR
                  </button>
                ) : (
                  <button
                    className="w-full bg-primary/20 rounded-md shadow-sm px-8 py-2 text-white text-lg uppercase cursor-not-allowed"
                    disabled={true}
                  >
                    Connect wallet
                  </button>
                )}
              </div>
            ) : (
              <>
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                    borderRadius: "15px",
                  }}
                  value={JSON.stringify(qrdata)}
                  viewBox={`0 0 256 256`}
                />
                <button
                  className="w-full px-8 py-2 text-white underline text-lg"
                  onClick={() => setShowqr(false)}
                >
                  Clear
                </button>
              </>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
