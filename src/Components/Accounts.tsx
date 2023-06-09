import React, { useEffect, useState } from "react";
import { Account } from "./Account";
import { useMoralis } from "react-moralis";

type AccountsProps = {
  handleSelectAccount: (address: string) => void;
};

export const Accounts = ({ handleSelectAccount }: AccountsProps) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const { account: signerAccount } = useMoralis();
  useEffect(() => {
    const getAccounts = async () => {
      const response = await fetch("http://localhost:3000/api/accounts");
      const { accounts } = await response.json();
      const accountsWithOutSigner = (accounts as string[]).filter(
        (account) => account !== signerAccount
      );
      setAccounts(accountsWithOutSigner);
    };
    getAccounts();
  }, []);

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
