import Link from "next/link";


interface CommitteeHistoryPanelProps {
  committeeHistory: {
    committee: {
      id: string;
      name: string;
    };
    season: {
      id: string;
      name: string;
      active: boolean;
    };
  }[];
  isLoading: boolean;
}

export default function CommitteeHistoryPanel({ committeeHistory, isLoading }: CommitteeHistoryPanelProps) {
  return (
    <div className="committee-history">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold mb-4">Committee History</h1>
        <Link href="/admin/committees">
          <span className="text-blue-500 hover:underline cursor-pointer">Go to Committees list</span>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : committeeHistory.length === 0 ? (
        <p>This member has not been part of a committee.</p>
      ) : (
        <ul>
          {committeeHistory.map((history) => (
            <li key={history.committee.id} className="mb-2">
              <div className="text-gray-500">
                {history.committee.name} - {history.season.name}
              </div>
              <span className="font-semibold">{history.committee.name}</span> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

