import { accountExist, addNewAddress } from "@/libs/balances";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  try {
    const address = params.address;
    const exists = await accountExist(address);
    if (exists) return NextResponse.json({ exists }, { status: 200 });

    await addNewAddress(address);

    return NextResponse.json(
      { message: "Account Added", address },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}
