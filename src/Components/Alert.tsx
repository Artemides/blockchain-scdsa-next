import Image from "next/image";
import React from "react";
import metamaskImage from "./../../public/metamask.png";
export const Alert = () => {
  return (
    <div className="w-screen h-screen grid place-items-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-white divide-x">
          <p className="text-3xl font-bold">Bchain</p>
          <p>Please install Metamask</p>
        </div>
        <Image src={metamaskImage} width={56} height={56} alt="metamask" />
      </div>
    </div>
  );
};
