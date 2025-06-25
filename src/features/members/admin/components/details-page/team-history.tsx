import { TeamHistoryItem } from "@/types/member";
import Link from "next/link";


interface TeamHistoryProps {
  teamHistory: TeamHistoryItem[], 
  isLoading: boolean;
}

export default function TeamHistoryPanel({
  teamHistory,
  isLoading,
}: TeamHistoryProps) {

  return (
    <div className="team-history">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold mb-4">Team History</h1>
        <Link href="/admin/teams">
          <span className="text-blue-500 hover:underline cursor-pointer">Go to Teams list</span>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : teamHistory.length === 0 ? (
        <p>No team history available.</p>
      ) : (
        <ul>
          {teamHistory.map((history) => (
            <li key={history.teamSeasonId} className="record-item mb-5 flex-col gap-1 justify-start align-start">
              <span className="font-semibold">{history.team.name}</span> 
              <span className="text-gray-500">{history.season.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}