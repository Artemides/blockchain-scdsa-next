import { getBalanceOf, transferBalances } from "@/libs/balances";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { from, to, value } = await request.json();
  console.log({ from, to, value });
  const fromBalance = getBalanceOf(from);
  if (fromBalance < value)
    return NextResponse.json(
      { message: "Not enough balance to transfer" },
      { status: 400 }
    );

  transferBalances(from, to, value);
  return NextResponse.json({ value }, { status: 201 });
}
