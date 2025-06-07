import { Team as PrismaTeam, TeamSeason, Member } from "@prisma/client";

export interface TeamListItem {
  teamSeasonId: string;
  teamId: string;
  name: string;
  teamCategory: string;
  theme: string | null; 
  players: string[]; 
}

export interface teamDetails {
  id: string;
  name: string;
  theme: string | null; 
  poule: string | null; 
  members?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    fieldPosition: string | null; 
    shirtNumber: string | null; 
  }>;
}