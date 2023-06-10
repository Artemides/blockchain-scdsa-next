"use client";
import { Card } from "@/Components/Card";
import MetamaskSDK, { MetaMaskSDKOptions } from "@metamask/sdk";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "@/Components/Alert";
import { useMoralis } from "react-moralis";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { Accounts } from "@/Components/Accounts";
import { Modal } from "@/Components/Modal";
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
  const fetchAccountBalance = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/api/balances/${fromAddress}`
    );
    const { balance } = await response.json();
    setFromBalance(balance);
  }, [fromAddress]);

  useEffect(() => {
    if (!fromAddress) return;

    fetchAccountBalance();
  }, [fetchAccountBalance, fromAddress]);

  const signTransaction = async (data: any): Promise<string | null> => {
    const dataString = JSON.stringify(data);
    const dataHashed = keccak256(utf8ToBytes(dataString));
    const signer = Moralis.web3?.getSigner();
    if (!signer) return null;

    const signature = await signer.signMessage(dataHashed);

    return signature;
  };

  const getAddress = async () => {
    const signer = Moralis.web3?.getSigner();
    if (!signer) return null;

    const address = await signer.getAddress();
    return address;
  };

  const transfer = async () => {
    try {
      const data = {
        recipientAddress,
        ammount,
      };
      const signature = await signTransaction(data);
      const pubKey = fromAddress;
      const response = await fetch("http://localhost:3000/api/transfer", {
        method: "POST",
        body: JSON.stringify({ signature, data, pubKey }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        setErrorMessage(responseData.message);
      } else {
        setErrorMessage(null);
      }
      setShowTransactionMessage(true);
      fetchAccountBalance();
      setAmmount(0);
      setTimeout(() => {
        setShowTransactionMessage(false);
      }, 10000);
    } catch (error) {
      console.error(error);
    }
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
        {!account && <Modal />}
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
              onClick={async () => {
                const address = await getAddress();
                if (!address) return;
                handleSelectAccount(address);
              }}
            >
              me
            </button>
          )}
          <Accounts handleSelectAccount={handleSelectAccount} />
          <div className="flex items-center justify-center self-center bg-sky-500/20 rounded-full  px-12 py-3 ">
            <p className="text-white text">
              Balance:
              <span className="font-bold text-green-400"> {fromBalance}</span>
            </p>
          </div>
        </div>
      </Card>
      <Card title="Transaction">
        {!account && <Modal />}
        <div className="p-6 flex flex-col gap-6">
          <label>
            <span className="text-white">Recipient</span>
            <input
              type="text"
              className="custom-input"
              placeholder="0xksd89213jkasd98213kjas..."
              value={recipientAddress}
              onChange={(e) => handleSelectRecipient(e.target.value)}
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
                <span className="error text-sm font-medium self-center px-2 py-[1px] rounded text-center">
                  {errorMessage}
                </span>
              ) : (
                <span className="success  text-sm  font-medium self-center px-4 py-[1px] rounded text-center">
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
