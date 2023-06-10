"use client";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const Navbar = () => {
  const { enableWeb3, account, Moralis, deactivateWeb3 } = useMoralis();
  const [signerAddress, setSignerAddress] = useState<string | null>(null);

  const createBalanceForAddress = useCallback(async () => {
    if (!signerAddress) return;

    const response = await fetch(`${apiUrl}/accounts/${signerAddress}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
  }, [signerAddress]);

  const handleConnectWallet = async () => {
    try {
      await enableWeb3();
      localStorage.setItem("connection", "injectedWeb3");
      await createBalanceForAddress();
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
      await createBalanceForAddress();
      await enableWeb3();
    };
    autoConnect();
  }, [createBalanceForAddress, enableWeb3]);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;

    const getAccounts = async () => {
      try {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setSignerAddress(address);
      } catch (error) {
        console.error(error);
      }
    };
    getAccounts();
  }, []);

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
