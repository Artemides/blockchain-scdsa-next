import { getBalanceOf, transferBalances } from "@/libs/balances";
import { NextRequest, NextResponse } from "next/server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { ethers } from "ethers";

export async function POST(request: NextRequest) {
  const { signature, data, pubKey } = await request.json();
  console.log({ signature });
  const dataHashed = keccak256(utf8ToBytes(JSON.stringify(data)));
  const parsedSignature = ethers.verifyMessage(dataHashed, signature);
  const isValid = parsedSignature === pubKey;
  if (!isValid)
    return NextResponse.json(
      { message: "Not allowed to transfer" },
      { status: 401 }
    );

  console.log({ isValid });
  return NextResponse.json({ signature });
  // const fromBalance = getBalanceOf(from);
  // if (fromBalance < value)
  //   return NextResponse.json(
  //     { message: "Not enough balance to transfer" },
  //     { status: 400 }
  //   );

  // transferBalances(from, to, value);
  // return NextResponse.json({ value }, { status: 201 });
}
