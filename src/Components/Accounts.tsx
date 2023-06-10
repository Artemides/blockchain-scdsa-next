import React, { useCallback, useEffect, useState } from "react";
import { Account } from "./Account";
import { useMoralis } from "react-moralis";

type AccountsProps = {
  handleSelectAccount: (address: string) => void;
};

export const Accounts = ({ handleSelectAccount }: AccountsProps) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const { Moralis } = useMoralis();

  const getAddress = useCallback(async () => {
    const signer = Moralis.web3?.getSigner();
    if (!signer) return null;

    const address = await signer.getAddress();
    return address;
  }, [Moralis.web3]);

  useEffect(() => {
    const getAccounts = async () => {
      const response = await fetch("http://localhost:3000/api/accounts");
      const { accounts } = await response.json();
      const signerAddress = await getAddress();
      const accountsWithOutSigner = (accounts as string[]).filter(
        (account) => account !== signerAddress
      );
      setAccounts(accountsWithOutSigner);
    };
    getAccounts();
  }, [getAddress]);

  return (
    <div className="flex flex-wrap gap-2">
      {accounts.map((account) => (
        <Account
          key={account}
          address={account}
          onSelect={handleSelectAccount}
        />
      ))}
    </div>
  );
};
