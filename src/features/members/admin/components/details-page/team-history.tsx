

export default function TeamHistoryPanel({
  teamHistory,
  isLoading,
}: {
  teamHistory: { id: string; name: string; startDate: string; endDate: string }[];
  isLoading: boolean;
}) {
  return (
    <div className="team-history">
      <h2>Team History</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : teamHistory.length === 0 ? (
        <p>No team history available.</p>
      ) : (
        <table className="team-history-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {teamHistory.map((history) => (
              <tr key={history.id}>
                <td>{history.name}</td>
                <td>{new Date(history.startDate).toLocaleDateString()}</td>
                <td>{history.endDate ? new Date(history.endDate).toLocaleDateString() : "Present"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}