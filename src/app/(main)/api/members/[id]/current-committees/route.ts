// app/api/members/[id]/current-committees/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API route to fetch the current committees of a member.
 * 
 * This route retrieves information about the (active season) committees that the member is a part of. 
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the member whose current team is being requested.
 * @returns NextResponse - A JSON response containing the team information or null if no team is found.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; // Await the promise to get the actual ID
  try {
    const committees = await prisma.committeeSeasonMember.findMany({
      where: {
        memberId: id, 
        committeeSeason: {
          season: { active: true },     // Ensure we only get team from the active season
        },
      },
      select: {
        committeeSeason: {
          select: {
            committee: {
              select: {
                id: true,
                name: true
              },
            },
            season: {
              select: {
                id: true,
                name: true,
                active: true,
              },
            },
          },
        },
      },
    });
    
    // return a list of datapoints of committees and their season
    return NextResponse.json(committees.map(c => ({
        committee: c.committeeSeason.committee,
        season: c.committeeSeason.season,
      })));
  } catch (error) {
    console.error(`Failed to fetch team for member ${id}:`, error);
    throw error;
  }
}