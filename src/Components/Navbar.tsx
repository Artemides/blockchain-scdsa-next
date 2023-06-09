"use client";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

export const Navbar = () => {
  const { enableWeb3, account, Moralis, deactivateWeb3 } = useMoralis();
  const handleConnectWallet = async () => {
    try {
      await enableWeb3();
      localStorage.setItem("connection", "injectedWeb3");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Moralis.onAccountChanged(async (account) => {
      if (account) return;
      localStorage.removeItem("connection");
      await deactivateWeb3();
    });
  }, [Moralis, deactivateWeb3]);

  const showConnectedWallet = (account: string) => {
    return <span className="text-sm font-bold text-sky-500 ">{account}</span>;
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (!localStorage.getItem("connection")) return;

      await enableWeb3();
    };
    autoConnect();
  }, [enableWeb3]);

  return (
    <nav className="w-full absolute top-0 flex justify-around p-2 bg-gradient-radial from-slate-900 to-black shadow-sm ">
      <span className="text-white text-2xl font-bold self-center">Bchain</span>
      <div className="">
        {account ? (
          showConnectedWallet(account)
        ) : (
          <button
            className="py-2 px-6 self-center text-sky-500 font-semibold bg-sky-500/25 rounded-full hover:bg-sky-500/40 transition-colors ease-out duration-300"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};
