import Image from "next/image";
import Card from "../components/Card/card";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] md:min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-row justify-center items-center gap-8 w-full px-8 md:px-12 pt-12">
        <Card />
      </div>
    </main>
  );
}
