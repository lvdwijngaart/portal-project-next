import Link from "next/link";


interface TeamHistoryProps {
  teamHistory: {
    id: string;
    team: { id: string; name: string };
    season: { id: string; name: string };
  }[], 
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
            <li key={history.id} className="record-item mb-5 flex-col gap-1 justify-start align-start">
              <span className="font-semibold">{history.team.name}</span> 
              <span className="text-gray-500">{history.season.name}</span>
            </li>
          ))}
        </ul>
        
        // <table className="team-history-table">
        //   <thead>
        //     <tr>
        //       <th>Team Name</th>
        //       <th>Season</th>
        //       <th>End Date</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {teamHistory.map((history) => (
        //       <tr key={history.team.id}>
        //         <td>{history.team.name}</td>
        //         <td>{history.season.name}</td>
        //         <td></td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      )}
    </div>
  );
}