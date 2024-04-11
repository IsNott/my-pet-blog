import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await auth();
  // console.log('_request',_request.destination);

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
