import { type } from "os";
import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="w-1/2 p-4 bg-gray-950 shadow-sm rounded-xl ">
      <h3 className=" text-white text-2xl text-center font-bold">{title}</h3>
      {children}
    </div>
  );
};
