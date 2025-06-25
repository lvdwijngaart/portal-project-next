
export interface TeamHistoryItem {
  teamSeasonId: string;
  team: {
    id: string;
    name: string;
  };
  season: {
    id: string;
    name: string;
  };
}

export interface CommitteeHistoryItem {
  comitteeSeasonId: string;
  committee: {
    id: string;
    name: string;
  };
  season: {
    id: string;
    name: string;
    active: boolean;
  };
}