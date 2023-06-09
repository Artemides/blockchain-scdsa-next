type Balance = {
  [key: string]: number;
};
const balances: Balance = {
  "0x05a6dbcc84402960604e3053f80d9ea29107207e": 100,
  "0x2d538ed3196001a99df16f09f67a9e05db39c657": 4000,
  "0x2f963f284f158f491fdac8994804971b73f5da34": 5060,
  "0x6a31af9dae2000b7ee9c0b40ca3d865cd2458809": 2000,
  "0xd2921c375f53407954bf95785e4dcf89913b0622": 7000,
  "0x6a5ae7507101393afce5a7a5004801e00f734eee": 2312,
  "0x38C5479620f6C2f29677F04d89E356cF6E75CFde": 3200,
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
