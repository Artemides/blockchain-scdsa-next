type Balance = {
  [key: string]: number;
};
const balances: Balance = {
  "0x1": 100,
  "0x2": 560,
};
function setInitialBalance(address: string) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

export const getBalanceOf = (address: string) => balances[address] || 0;

export const transferBalances = (from: string, to: string, value: number) => {
  setInitialBalance(from);
  setInitialBalance(to);

  balances[from] -= value;
  balances[to] += value;
  return value;
};
