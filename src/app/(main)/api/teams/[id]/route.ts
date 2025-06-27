import { teamDetails } from "@/types/team";
import { NextResponse } from "next/server";

/**
 * Route to fetch teamSeason details by teamSeasonId. These details include: 
 * - team id
 * - team name
 * - team theme
 * - team poule
 * - nevobo poule id
 * - nevobo region
 * - team photo (id, url, caption)
 * - team members (id, firstName, lastName, fieldPosition, shirtNumber)
 * 
 * @param req 
 * @param param1 
 * @returns TeamDetails object or null if not found, or 500 if an error occurs
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        nevoboPouleId: true,
        nevoboRegion: true,

        team: {
          select: {
            id: true, 
            name: true, 
            nevoboName: true,
          }
        }, 

        members: {
          select: {
            id: true,
            isCaptain: true,
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

        teamPhoto: {
          select: {
            id: true,
            url: true,
            caption: true,
          }
        }
                
      }
    });

    console.log("Fetched team:", team);

    // If no team is found, return null
    if (!team) {
      return NextResponse.json(null);
    }

    const formattedTeam: teamDetails = {
      id: team.id,
      theme: team.theme,
      poule: team.poule,

      nevoboPouleId: team.nevoboPouleId,
      nevoboRegion: team.nevoboRegion,

      team: {
        id: team.team.id, 
        name: team.team.name, 
        nevoboName: team.team.nevoboName || null
      },

      members: team.members.map(member => ({
        id: member.id,
        firstName: member.member.firstName,
        lastName: member.member.lastName,
        fieldPosition: member.member.fieldPosition,
        shirtNumber: member.member.shirtNumber,
        isCaptain: member.isCaptain || false, 
      })),

      teamPhoto: team.teamPhoto
        ? {
            id: team.teamPhoto.id,
            url: team.teamPhoto.url,
            caption: team.teamPhoto.caption || null,
          }
        : null,
    };

    return NextResponse.json(formattedTeam);
  } catch (e) {
    console.error("Internal server error:", e);
    return NextResponse.json({ error: `Internal server error: ${e}` }, { status: 500 });
  }
}