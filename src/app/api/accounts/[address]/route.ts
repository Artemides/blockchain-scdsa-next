import { accountExist, addNewAddress } from "@/libs/balances";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  try {
    const address = params.address;
    console.log({ address });
    const exists = accountExist(address);
    if (exists) return NextResponse.json({ exists }, { status: 200 });

    addNewAddress(address);

    return NextResponse.json(
      { message: "Account Added", address },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
