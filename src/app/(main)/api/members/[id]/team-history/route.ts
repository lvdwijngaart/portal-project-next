// app/api/members/[id]/current-team/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API route to fetch the team history of a member. 
 * 
 * This route retrieves a (sorted) list of teams that this member is associated with. 
 * The data includes: team id, team name, season id and season name. 
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the member whose team history is requested.
 * @returns NextResponse - A JSON response containing the team information or null if no team is found.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; // Await the promise to get the actual ID
  try {
    const rec = await prisma.teamSeasonMember.findMany({
      where: {
        memberId: id, 
      },
      select: {
        teamSeason: {
          select: {
            team: {
              select: { id: true, name: true },     // For now only need id and name, can be extended
            },
            season: {
              select: { id: true, name: true },     // Include season information
            },
          },
        },
      },
      orderBy: {
      teamSeason: {
        season: {
        id: 'asc',
        },
      },
      },
    });
    
    // Only if there are such records, return the team history. Otherwise return null. 
    if (rec && rec.length > 0) {
      const teamHistory = rec.map(item => ({
      team: item.teamSeason.team,
      season: item.teamSeason.season,
      }));
      return NextResponse.json(teamHistory);
    }
    return NextResponse.json(null);
  } catch (error) {
    console.error(`Failed to fetch team for member ${id}:`, error);
    throw error;
  }
}