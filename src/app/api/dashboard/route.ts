import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const locations = await db.user.findMany({
      select: {
        latitude: true,
        longitude: true,
      },
    });
    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return NextResponse.json(
      { error: "Error fetching coordinates" },
      { status: 500 }
    );
  }
}
