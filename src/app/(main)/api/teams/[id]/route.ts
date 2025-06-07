import { teamDetails } from "@/types/team";
import { NextResponse } from "next/server";
import { ca } from "zod/v4/locales";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const teamSeasonId = (await params).id;

  try {
    // Fetch the team details from the database, by supplied teamSeasonId
    const team = await prisma?.teamSeason.findUnique({
      where: {
        id: teamSeasonId,
      }, 
      select: {
        id: true, 
        theme: true, 
        poule: true,

        team: {
          select: {
            id: true, 
            name: true, 
          }
        }, 

        members: {
          select: {
            id: true,
            member: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                fieldPosition: true,
                shirtNumber: true,
              }
            }
          }
        },
                
      }
    });

    console.log("Fetched team:", team);

    // If no team is found, return a 404 response
    if (!team) {
      return NextResponse.json(
        { error: "Team not found" }, 
        { status: 404 }
      );
    }

    const formattedTeam: teamDetails = {
      id: team.id,
      name: team.team.name,
      theme: team.theme,
      poule: team.poule,
      members: team.members.map(member => ({
        id: member.id, 
        firstName: member.member.firstName,
        lastName: member.member.lastName,
        fieldPosition: member.member.fieldPosition,
        shirtNumber: member.member.shirtNumber,
      })), 
    }

    return NextResponse.json(formattedTeam || null);
  } catch (e) {
    console.error("Internal server error:", e);
    return NextResponse.json({ error: `Internal server error: ${e}` }, { status: 500 });
  }
}