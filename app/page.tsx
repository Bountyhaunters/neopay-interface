import Image from "next/image";
import Panel from "./components/Panel/panel";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[80vh] md:min-h-screen flex-col items-center justify-center px-6 md:px-12 py-12">
        <div className="flex flex-col-reverse md:grid grid-cols-2 gap-12 w-full">
          <div className="flex flex-col justify-center items-start gap-6">
            <h1 className="text-5xl md:text-7xl text-black font-bold leading-none uppercase">
              {process.env.NEXT_PUBLIC_BRAND_NAME}
            </h1>

            <h2 className="text-3xl md:text-5xl text-black font-bold uppercase !leading-tight">
              Simply scan the{" "}
              <span className=" underline decoration-primary">QR code</span> and
              pay with{" "}
              <span className=" underline decoration-primary">Any Token</span>
            </h2>
            <div className="flex flex-row justify-center items-center gap-4">
              <Link
                href="/app"
                className="text-lg text-center md:text-2xl bg-primary text-white px-4 md:px-8 py-2 rounded-full shadow-md"
              >
                Launch App
              </Link>
              <Link
                href="#readmore"
                className=" text-lg text-center md:text-2xl border-[1px] border-secondary text-secondary px-4 md:px-8 py-2 rounded-full shadow-md"
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
        className="flex flex-col md:flex-row justify-center items-center gap-8 w-full px-6 md:px-12 pb-12"
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
          content="Streamline customer payments with NeoPay's scan-and-pay feature. Effortlessly enable customers to make transactions by scanning the QR code, enhancing convenience and user experience which makes it easy and straightforward to use."
        />
      </section>
    </>
  );
}
