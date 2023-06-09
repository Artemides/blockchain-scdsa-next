"use client";
import { Card } from "@/Components/Card";
import Image from "next/image";
import MetamaskSDK, { MetaMaskSDKOptions } from "@metamask/sdk";
import { useEffect, useState } from "react";
import { Alert } from "@/Components/Alert";
import { useMoralis } from "react-moralis";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { Accounts } from "@/Components/Accounts";
export default function Home() {
  // const MMSDK = new MetamaskSDK();
  // const ethereum = MMSDK.getProvider();
  const [isMetamask, setIsMetamask] = useState(false);

  const { account, Moralis } = useMoralis();

  const [fromAddress, setFromAddress] = useState(account ?? "");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [fromBalance, setFromBalance] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);

  const [showTransactionMessage, setShowTransactionMessage] = useState(false);

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

    return signature;
  };

  const getPublicKey = async () => {
    const signer = Moralis.web3?.getSigner();
    if (!signer) return null;

    const pubKey = await signer.getAddress();
    return pubKey;
  };

  const transfer = async () => {
    const data = {
      recipientAddress,
      ammount,
    };
    const signature = await signTransaction(data);
    const pubKey = await getPublicKey();
    const response = await fetch("http://localhost:3000/api/transfer", {
      method: "POST",
      body: JSON.stringify({ signature, data, pubKey }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log({ responseData });
    if (response.status !== 200) {
      console.log({ message: responseData.message });
      setErrorMessage(responseData.message);
    } else {
      setErrorMessage(null);
    }
    setShowTransactionMessage(true);
    setTimeout(() => {
      setShowTransactionMessage(false);
    }, 5000);
  };
  const handleSelectAccount = (account: string) => {
    setFromAddress(account);
  };
  const handleSelectRecipient = (account: string) => {
    setRecipientAddress(account);
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
      <Card title="Accounts">
        <div className="p-6 flex flex-col gap-4">
          <label>
            <span className="text-white">Address</span>
            <input
              type="text"
              className="custom-input disabled:text-white"
              placeholder="0xksd89213jkasd98213kjas..."
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              disabled={true}
            />
          </label>
          {account && (
            <button
              className="self-start custom-button success-color text-xs"
              onClick={() => handleSelectAccount(account)}
            >
              me
            </button>
          )}
          <Accounts handleSelectAccount={handleSelectAccount} />
          <div className="flex items-center justify-center self-center bg-sky-500/20 rounded-full  px-12 py-3 ">
            <p className="text-white text">
              Balance:
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
              value={recipientAddress}
            />
          </label>
          <Accounts handleSelectAccount={handleSelectRecipient} />

          <label>
            <span className="text-white">Ammout</span>
            <input
              type="number"
              className="custom-input"
              placeholder="0"
              value={ammount}
              onChange={(e) => setAmmount(Number(e.target.value))}
            />
          </label>
          <button className="custom-button primary-color" onClick={transfer}>
            Transfer
          </button>
          {showTransactionMessage && (
            <>
              {" "}
              {errorMessage ? (
                <span className="error self-center px-2 py-2 rounded text-center">
                  {errorMessage}
                </span>
              ) : (
                <span className="success  self-center px-4 py-2 rounded text-center">
                  Transaction Succesfull
                </span>
              )}
            </>
          )}
        </div>
      </Card>
    </main>
  );
}
