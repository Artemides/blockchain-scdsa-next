import React from "react";

type AccountProps = {
  address: string;
  onSelect: (address: string) => void;
};

export const Account = ({ address, onSelect }: AccountProps) => {
  return (
    <button
      className="custom-button primary-color text-xs "
      onClick={() => onSelect(address)}
    >
      {`${address.slice(0, 8)}...${address.slice(-4)}`}
    </button>
  );
};
