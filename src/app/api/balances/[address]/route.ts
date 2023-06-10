import { getBalanceOf } from "@/libs/balances";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const address = params.address;

    const balance = await getBalanceOf(address);
    return NextResponse.json({ balance }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "Address balances not found" },
      { status: 404 }
    );
  }
}
