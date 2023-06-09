type Balance = {
  [key: string]: number;
};
const balances: Balance = {
  "0x05a6dbcc84402960604e3053f80d9ea29107207e": 100,
  "0x2d538ed3196001a99df16f09f67a9e05db39c657": 400,
  "0x2f963f284f158f491fdac8994804971b73f5da34": 560,
};

function setInitialBalance(address: string) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

export const getAccounts = () => {
  return Object.keys(balances);
};
export const getBalanceOf = (address: string) => balances[address] || 0;

export const transferBalances = (from: string, to: string, value: number) => {
  setInitialBalance(from);
  setInitialBalance(to);

  balances[from] -= value;
  balances[to] += value;
  return value;
};
