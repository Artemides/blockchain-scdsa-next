import { Card } from "@/Components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-start  gap-4 p-16 bg-gradient-to-r from-slate-950 from-10% via-slate-900 via-40% to-black to-80% ">
      <Card title="Your Wallet">
        <div className="p-6 flex flex-col">
          <label>
            <span className="text-white">Address</span>
            <input
              type="text"
              className="custom-input"
              placeholder="0xksd89213jkasd98213kjas..."
            />
          </label>
          <div className="flex items-center justify-center self-center bg-sky-500/10 rounded-full mt-4 px-12 py-3 ">
            <p className="text-white text">
              Balance: <span className="font-bold">0</span>
            </p>
          </div>
        </div>
      </Card>
      <Card title="Transaction">
        <div className="p-6 flex flex-col gap-6">
          <label>
            <span className="text-white">Recipient</span>
            <input
              type="text"
              className="custom-input"
              placeholder="0xksd89213jkasd98213kjas..."
            />
          </label>
          <label>
            <span className="text-white">Ammout</span>
            <input type="text" className="custom-input" placeholder="0" />
          </label>
          <button className="py-2 px-6 self-center text-sky-500 font-semibold bg-sky-500/25 rounded-full hover:bg-sky-500/40 transition-colors ease-out duration-300">
            Transfer
          </button>
        </div>
      </Card>
    </main>
  );
}
