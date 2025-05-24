import { Member } from "@prisma/client";

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onDelete: () => void;
}

export default function DeleteMemberModal({
  isOpen,
  onClose,
  member,
  onDelete,
}: DeleteMemberModalProps) {

  // If the modal is not open, return null to avoid rendering
  if (!isOpen || !member) {
    return null;
  }

  // Handle backdrop click to close (only if clicking the overlay itself)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Delete Member</h2>
        <p>Are you sure you want to delete <strong>{member.firstName} {member.lastName}</strong>?</p>
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          <button type="button" className="delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}