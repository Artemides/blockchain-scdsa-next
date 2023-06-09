import Image from "next/image";
import React from "react";
import metamask from "../../public/metamask.png";
export const Modal = () => {
  return (
    <div className="absolute grid place-items-center bg-black/40 inset-0">
      <div className="w-1/3 grid place-items-center p-4 bg-zinc-900/80 rounded-lg shadow-2xl">
        <Image src={metamask} width={52} height={52} alt="metamask" />
        <h3 className="text-white text-xl font-bold text-center">
          Connect your Wallet
        </h3>
      </div>
    </div>
  );
};
