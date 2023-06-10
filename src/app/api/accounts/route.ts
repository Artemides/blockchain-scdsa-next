import { getAccounts } from "@/libs/balances";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAccounts();
    return NextResponse.json({ accounts });
  } catch (error) {
    console.error(error);
  }
}
