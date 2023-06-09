import path from "path";
import fs from "fs/promises";

const BALANCES_PATH = path.join(process.cwd(), `/public/balances.json`);

type Balance = {
  [key: string]: number;
};

const getServerBalances = async () => {
  console.log({ BALANCES_PATH });
  const file = await fs.readFile(BALANCES_PATH, "utf8");
  const balances: Balance = JSON.parse(file);
  return balances;
};

const saveBalances = async (balances: Balance) => {
  try {
    await fs.writeFile(BALANCES_PATH, JSON.stringify(balances));
  } catch (error) {
    console.error(error);
  }
};

async function setInitialBalance(address: string) {
  const balances = await getServerBalances();
  if (!balances[address]) {
    balances[address] = 0;
  }
  saveBalances(balances);
}

export const getAccounts = async () => {
  const balances = await getServerBalances();
  return Object.keys(balances);
};
export const getBalanceOf = async (address: string) => {
  const balances = await getServerBalances();
  return balances[address] || 0;
};

export const transferBalances = async (
  from: string,
  to: string,
  value: number
) => {
  const balances = await getServerBalances();
  setInitialBalance(from);
  setInitialBalance(to);

  balances[from] -= value;
  balances[to] += value;
  saveBalances(balances);
  return value;
};

export const accountExist = async (address: string) => {
  const balances = await getServerBalances();
  return Object.keys(balances).includes(address);
};

export const getBalances = () => {
  const balances = getServerBalances();
  return balances;
};

export const addNewAddress = async (address: string) => {
  const balances = await getServerBalances();
  balances[address] = 8545;
  saveBalances(balances);
};
