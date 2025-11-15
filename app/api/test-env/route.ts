import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    hasBetterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 15),
  });
}