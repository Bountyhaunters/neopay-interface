import Image from "next/image";
import Panel from "./components/Panel/panel";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[80vh] md:min-h-screen flex-col items-center justify-center px-8 md:px-12">
        <div className="flex flex-col-reverse md:grid grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-start gap-6">
            <h1 className="text-5xl md:text-7xl text-black font-bold leading-none uppercase">
              NEOPAY
              <br /> Payments made easy on NEO EVM
            </h1>
            <div className="flex flex-row justify-center items-center gap-4">
              <Link
                href="/app"
                className="text-lg text-center md:text-2xl bg-primary text-white px-8 py-2 rounded-full shadow-md"
              >
                Launch App
              </Link>
              <Link
                href="#readmore"
                className=" text-lg text-center md:text-2xl border-[1px] border-primary text-primary px-8 py-2 rounded-full shadow-md"
              >
                Read more
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <Image
              src={"/hero-image1.svg"}
              alt="Payment Image"
              height={"550"}
              width={"550"}
            />
          </div>
        </div>
      </main>
      <section
        className="flex flex-col md:flex-row justify-center items-center gap-8 w-full px-8 md:px-12 pb-12"
        id="readmore"
      >
        <Panel
          image="/icons/Send.svg"
          buttonText="Send Payment"
          buttonIcon="/icons/button-send.svg"
          content="NeoPay is an open-source & hassle-free payment solution built on the Neo blockchain, that is straightforward to use. This payment and customizable option can be smoothly incorporated into any Dapps within the Neo Ecosystem by deploying the NeoPay Docker image."
        />

        <Panel
          image="/icons/QR.svg"
          buttonText="Recieve Payment"
          buttonIcon="/icons/button-qr.svg"
          content="NeoPay is an open-source & hassle-free payment solution built on the Neo blockchain, that is straightforward to use. This payment and customizable option can be smoothly incorporated into any Dapps within the Neo Ecosystem by deploying the NeoPay Docker image."
        />
      </section>
    </>
  );
}
