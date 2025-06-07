import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TeamListItem } from "@/types/team";



export async function GET(_req: Request) {
  try {
    // Fetch all teams from the database
    const teams = await prisma?.teamSeason.findMany({
      where: {
        season: {
          active: true, // Only fetch teams for the current season
        },
      },
      select: {
        id: true, 
        theme: true, 
        members: {
          select: {
            id: true
          }     
        },
        team: {
          select: {
            id: true,
            name: true, 
            teamCategory: true, 
          }
        }
      } 
    });

    // Map the results to a simpler format
    const formattedTeams: TeamListItem[] = teams?.map((team) => {
      return {
        teamSeasonId: team.id, 
        teamId: team.team.id,
        name: team.team.name, 
        teamCategory: team.team.teamCategory,
        theme: team.theme, 
        players: team.members.map(member => member.id)
      }
    });

    return NextResponse.json(formattedTeams || []);
  } catch (e) {
    console.error("Failed to fetch teams:", e);
    return NextResponse.json({ error: `Failed to fetch teams ${e}` }, { status: 500 });
  }
}