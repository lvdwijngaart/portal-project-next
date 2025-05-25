import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * API route to fetch an activity record by its ID.
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the activity record to be fetched.
 * @returns NextResponse - activity record as JSON if found, otherwise null.
 */
export async function GET(_req: Request, { params: { id } }: { params: { id: string } }) {
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