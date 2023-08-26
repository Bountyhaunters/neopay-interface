import Image from "next/image";
import Card from "./components/Card/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-row justify-center items-center gap-8 w-full px-8 md:px-12">
        {/* <Card
          image="/icons/Send.svg"
          buttonText="Send Payment"
          buttonIcon="/icons/button-send.svg"
        />
        <div className="text-black font-semibold">(OR)</div>
        <Card
          image="/icons/QR.svg"
          buttonText="Recieve Payment"
          buttonIcon="/icons/button-qr.svg"
        /> */}
        <Card />
      </div>
    </main>
  );
}
