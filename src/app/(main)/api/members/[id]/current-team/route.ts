// app/api/members/[id]/current-team/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API route to fetch the current team of a member.
 * 
 * This route retrieves information about the team that the member is currently associated with (=season is active)
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the member whose current team is being requested.
 * @returns NextResponse - A JSON response containing the team information or null if no team is found.
 */
export async function GET(_req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const rec = await prisma.teamSeasonMember.findFirst({
      where: {
        memberId: id, 
        teamSeason: {
          season: { active: true },     // Ensure we only get team from the active season
        },
      },
      select: {
        teamSeason: {
          select: {
            team: {
              select: { id: true, name: true },     // For now only need id and name, can be extended
            },
          },
        },
      },
    });
    
    return NextResponse.json(rec?.teamSeason?.team || null);
  } catch (error) {
    console.error(`Failed to fetch team for member ${id}:`, error);
    throw error;
  }
}