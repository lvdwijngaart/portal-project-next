// Raw XML parsing result (what xml2js gives you)
export interface NevoboRawStanding {
  'stand:nummer': string;
  'stand:team': {
    _: string;           // Team name
    $: { id: string };   // Team ID
  };
  'stand:wedstrijden': string;
  'stand:punten': string;
  'stand:setsvoor': string;
  'stand:setstegen': string;
  'stand:puntenvoor': string;
  'stand:puntentegen': string;
}

export interface NevoboRawResponse {
  rss: {
    channel: {
      title: string;
      description: string;
      lastBuildDate: string;
      'stand:ranking': NevoboRawStanding | NevoboRawStanding[];
    };
  };
}

// Clean, normalized types for your application
export interface StandingEntry {
  position: number;
  team: {
    id: string;
    name: string;
  };
  matches: number;
  points: number;
  setsFor: number;
  setsAgainst: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface StandingsResponse {
  standings: StandingEntry[];
  metadata: {
    title: string;
    lastUpdated: string;
  };
}