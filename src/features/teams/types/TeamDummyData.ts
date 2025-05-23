import { Team } from "./Team";

export const teamDummyData: Team[] = [
  {
    id: "1",
    name: "Ladies 1",
    memberIds: ["1", "2"],
    theme: "Ladies UnoX",
    season: "2024-2025",
    level: "Dames 1e divisie Poule A",
    trainingDays: ["Monday 20:00-21:30", "Wednesday 20:00-21:30", "Friday 20:00-21:30"],
    teamPhoto: "https://example.com/team-a.jpg",
  },
  {
    id: "2",
    name: "Ladies 2",
    memberIds: ["3", "4"],
    theme: "Ladies Cupidos",
    season: "2024-2025",
    level: "Dames Promotieklasse Poule A",
    trainingDays: ["Wednesday 20:00-21:30", "Friday 20:00-21:30"],
    teamPhoto: "https://example.com/team-b.jpg",
  },
];