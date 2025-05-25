

interface CommitteeHistoryPanelProps {
  committeeHistory: {
    id: string;
    name: string;
    startDate: string;
    endDate: string | null;
  }[];
  isLoading: boolean;
}

export default function CommitteeHistoryPanel({ committeeHistory, isLoading }: CommitteeHistoryPanelProps) {
  return (
    <div className="committee-history">
      <h1 className="text-lg font-bold mb-4">Committee History</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : committeeHistory.length === 0 ? (
        <p>This member has not been part of a committee.</p>
      ) : (
        <ul>
          {committeeHistory.map((history) => (
            <li key={history.id} className="mb-2">
              <div className="text-gray-500">
                {history.name}
              </div>
              <span className="font-semibold">{history.name}</span> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

