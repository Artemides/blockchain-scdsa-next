"use client";
import React from "react";

export const Navbar = () => {
  const handleConnectWallet = () => {
    if (window.ethereum) {
      console.log(window.ethereum);
    } else {
      alert("Plese install Metamask Extension");
    }
  };
  return (
    <nav className="w-full absolute top-0 flex justify-around p-2 bg-gradient-radial from-slate-900 to-black shadow-sm ">
      <span className="text-white text-2xl font-bold self-center">Bchain</span>
      <div className="">
        <button
          className="py-2 px-6 self-center text-sky-500 font-semibold bg-sky-500/25 rounded-full hover:bg-sky-500/40 transition-colors ease-out duration-300"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};
