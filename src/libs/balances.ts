import path from "path";
import fs from "fs";
const BALANCES_PATH = "./public/balances.json";

type Balance = {
  [key: string]: number;
};

const getServerBalances = () => {
  const balances: Balance = JSON.parse(fs.readFileSync(BALANCES_PATH, "utf8"));
  return balances;
};

const saveBalances = (balances: Balance) => {
  fs.writeFileSync(BALANCES_PATH, JSON.stringify(balances));
};

getServerBalances();

function setInitialBalance(address: string) {
  const balances = getServerBalances();
  if (!balances[address]) {
    balances[address] = 0;
  }
  saveBalances(balances);
}

export const getAccounts = () => {
  const balances = getServerBalances();
  return Object.keys(balances);
};
export const getBalanceOf = (address: string) => {
  const balances = getServerBalances();
  return balances[address] || 0;
};

export const transferBalances = (from: string, to: string, value: number) => {
  const balances = getServerBalances();
  setInitialBalance(from);
  setInitialBalance(to);

  balances[from] -= value;
  balances[to] += value;
  saveBalances(balances);
  return value;
};

export const accountExist = (address: string) => {
  const balances = getServerBalances();
  return Object.keys(balances).includes(address);
};

export const getBalances = () => {
  const balances = getServerBalances();
  return balances;
};

export const addNewAddress = (address: string) => {
  const balances = getServerBalances();
  balances[address] = 8545;
  console.log({ balances });
  saveBalances(balances);
};
