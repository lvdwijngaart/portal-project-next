

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
  theme: string | null; 
  poule: string | null; 

  nevoboPouleId: string | null;
  nevoboRegion: string | null;

  team: {
    id: string;
    name: string;
    nevoboName: string | null; 
  }

  members?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    fieldPosition: string | null; 
    shirtNumber: string | null; 
  }>;

  teamPhoto?: {
    id: string;
    url: string;
    caption: string | null; 
  } | null;
}

