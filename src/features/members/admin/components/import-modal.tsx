

import "../styles/import-modal.css"; 

interface ImportMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: ;
}

/**
 * A modal component for importing members via a CSV file.
 *
 * @param isOpen - Determines whether the modal is visible.
 * @param onClose - Callback function to close the modal.
 * @param onSubmit - Callback function to handle the submission of the form.
 *
 * Renders a modal dialog with a file input for uploading a CSV file.
 * Includes "Cancel" and "Import Members" buttons.
 * Clicking the overlay or the "Cancel" button will close the modal.
 *
 * @returns The modal JSX if `isOpen` is true, otherwise `null`.
 */
export default function ImportMemberModal({ isOpen, onClose }: ImportMemberModalProps) {

  // If the modal is not open, return null to avoid rendering
  if (!isOpen) {
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
        <h2>Import Members</h2>
        <p>Upload a CSV file to import members.</p>
        <form>
          <div className="form-group">
            <label htmlFor="file">Choose CSV file</label>
            <input type="file" id="file" accept=".csv" />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Import Members
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}