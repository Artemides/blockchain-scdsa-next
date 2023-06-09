import React from "react";

type AccountProps = {
  address: string;
  onSelect: () => void;
};

export const Account = ({ address, onSelect }: AccountProps) => {
  return (
    <button className="custom-button" onClick={onSelect}>
      {address}
    </button>
  );
};
