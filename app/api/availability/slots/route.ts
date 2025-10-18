import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAvailableSlots } from "@/lib/actions/availability";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const duration = searchParams.get("duration");

  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const result = await getAvailableSlots(
    new Date(date),
    duration ? parseInt(duration) : 60
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
