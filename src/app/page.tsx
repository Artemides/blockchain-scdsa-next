"use client";
import { Card } from "@/Components/Card";
import Image from "next/image";
import MetamaskSDK, { MetaMaskSDKOptions } from "@metamask/sdk";
import { useEffect, useState } from "react";
import { Alert } from "@/Components/Alert";
import { useMoralis } from "react-moralis";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
export default function Home() {
  // const MMSDK = new MetamaskSDK();
  // const ethereum = MMSDK.getProvider();
  const [isMetamask, setIsMetamask] = useState(false);

  const { account, Moralis } = useMoralis();

  const [fromAddress, setFromAddress] = useState(account ?? "");
  const [fromBalance, setFromBalance] = useState(0);
  useEffect(() => {
    if (!window.ethereum) return;

    setIsMetamask(true);
  }, []);

  useEffect(() => {
    if (!fromAddress) return;

    const fetchAccountBalance = async () => {
      const response = await fetch(
        `http://localhost:3000/api/balances/${fromAddress}`
      );
      const { balance } = await response.json();
      setFromBalance(balance);
    };
    fetchAccountBalance();
  }, [fromAddress]);

  const signTransaction = async (data: any): Promise<string | null> => {
    const dataString = JSON.stringify(data);
    const dataHashed = keccak256(utf8ToBytes(dataString));
    const signer = Moralis.web3?.getSigner();
    if (!signer) return null;

    const signature = await signer.signMessage(dataHashed);
    console.log({ signature });
    return signature;
  };

  if (!isMetamask) {
    return (
      <main className="h-screen flex items-start  gap-4 p-16 bg-gradient-to-r from-slate-950 from-10% via-slate-900 via-40% to-black to-80% ">
        <Alert />
      </main>
    );
  }

  return (
    <main className="h-screen flex items-start  gap-4 p-16 bg-gradient-to-r from-slate-950 from-10% via-slate-900 via-40% to-black to-80% ">
      <Card title="Your Wallet">
        <div className="p-6 flex flex-col">
          <label>
            <span className="text-white">Address</span>
            <input
              type="text"
              className="custom-input"
              placeholder="0xksd89213jkasd98213kjas..."
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-center self-center bg-sky-500/20 rounded-full mt-4 px-12 py-3 ">
            <p className="text-white text">
              Balance:{" "}
              <span className="font-bold text-sky-500">{fromBalance}</span>
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
          <button
            className="custom-button"
            onClick={() => signTransaction({ to: "ss", value: 320 })}
          >
            Transfer
          </button>
        </div>
      </Card>
    </main>
  );
}
