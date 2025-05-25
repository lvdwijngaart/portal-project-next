

import prisma from "@/lib/prisma";

export type CurrentTeam = {
  id: string;
  name: string;
};

export async function getMemberCurrentTeam(
  memberId: string
): Promise<CurrentTeam | null> {
  // Find the TeamSeasonMember row for this member in the active Season:
  const rec = await prisma.teamSeasonMember.findFirst({
    where: {
      memberId,
      teamSeason: {
        season: { active: true },
      },
    },
    select: {
      teamSeason: {
        select: {
          team: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  if (!rec) return null;
  return rec.teamSeason.team;
}

// export async function getMemberTeamHistory(memberId: string): Promise<{
//   endDate: string;
//   startDate: string; id: string; name: string; 
// }[]> {
//   try {
//     const teamHistory = await prisma.teamMembership.findMany({
//       where: { memberId },
//       select: {
//         team: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         startDate: true,
//         endDate: true,
//       },
//     });

//     return teamHistory.map((history) => ({
//       id: history.team.id,
//       name: history.team.name,
//       startDate: history.startDate.toISOString(),
//       endDate: history.endDate ? history.endDate.toISOString() : undefined,
//     }));
//   } catch (error) {
//     console.error(`Failed to get team history for member with ID ${memberId}:`, error);
//     throw new Error(`Failed to get team history for member with ID ${memberId}`);
//   }
// }