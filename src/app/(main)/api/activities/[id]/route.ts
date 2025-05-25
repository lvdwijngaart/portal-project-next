import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string; // The ID of the activity record to be fetched
  };
};

/**
 * API route to fetch an activity record by its ID.
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the activity record to be fetched.
 * @returns NextResponse - activity record as JSON if found, otherwise null.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const id = (await params).id; // Await the promise to get the actual ID
  try {
    const rec = await prisma.activity.findFirst({
      where: {
      id: id
      }
    });
    
    // return the activity record if found, otherwise return null
    return NextResponse.json(rec ?? null);
  } catch (error) {
    console.error(`Failed to fetch team for member ${id}:`, error);
    throw error;
  }
}