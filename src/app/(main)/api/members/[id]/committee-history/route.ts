// app/api/members/[id]/current-team/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API route to fetch the committee history of a member. 
 * 
 * This route retrieves a (sorted) list of committees that this member has been a part of. 
 * The data includes: committee id, committee name, season id, season name and if the season is active. 
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the member whose team history is requested.
 * @returns NextResponse - A JSON response containing the team information or null if no team is found.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; // Await the promise to get the actual ID
  try {
    const rec = await prisma.committeeSeasonMember.findMany({
      where: {
        memberId: id, 
      },
      select: {
        committeeSeason: {
          select: {
            committee: {
              select: { id: true, name: true },     // For now only need id and name, can be extended
            },
            season: {
              select: { id: true, name: true },     // Include season information
            },
          },
        },
      },
      orderBy: {
        committeeSeason: {
          season: {
          id: 'asc',
          },
        },
      },
    });
    
    // Only if there are such records, return the team history. Otherwise return null. 
    if (rec && rec.length > 0) {
      const committeeHistory = rec.map(committee => ({
        committee: committee.committeeSeason.committee,
        season: committee.committeeSeason.season,
      }));
      return NextResponse.json(committeeHistory);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error(`Failed to fetch committee for member ${id}:`, error);
    throw error;
  }
}