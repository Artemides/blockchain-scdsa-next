import { Card } from "@/Components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen flex  gap-4 p-16 bg-gradient-to-r from-slate-950 from-10% via-slate-900 via-40% to-black to-80% ">
      <Card />
      <Card />
    </main>
  );
}
