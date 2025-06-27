

interface ImportTeamSeasonModalProps {
  onClose: () => void;
}

export default function ImportTeamSeasonModal({ onClose }: ImportTeamSeasonModalProps) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="modal-content bg-white rounded-lg p-6 w-full max-w-xl relative">
        <h2>Export Team Season</h2>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}