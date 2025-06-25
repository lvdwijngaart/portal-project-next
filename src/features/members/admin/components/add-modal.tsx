

import { createMember, updateMember } from "../../services/membersService";
import React, { useState, useTransition } from "react";
import type { Member } from "@prisma/client"

import "../styles/add-modal.css";


interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submittedMember: Member) => void;
  memberToEdit?: Member | null;
}

/**
 * AddMemberModal component
 * 
 * This component renders a modal for adding a new member.
 * It includes fields for first name, last name, email, phone number, 
 * @param isOpen - Boolean indicating if the modal is open.
 * @param onClose - Function to call when the modal is closed.
 * @param onSubmit - Optional function to call on successful addition of a member. 
 * @returns JSX.Element representing the AddMemberModal component.
 */
export default function AddMemberModal({ isOpen, onClose, onSubmit, memberToEdit }: AddMemberModalProps) {

  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition(); // Responsible for managing loading state

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

  // Handle form submission
  async function handleFormAction(formData: FormData) {
    setError('');

    try {
      // Create a member object from the form data
      const member = {
        id: memberToEdit?.id,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || null,
        // Add any other required fields with default or null values as needed
      };

      // Use updateMember if editing, otherwise create a new member
      const updatedMember = memberToEdit 
        ? await updateMember(memberToEdit.id, member)
        : await createMember(member);

      onSubmit(updatedMember);
      onClose();
    } catch (e) {
      console.error("Error:", e);
      setError(e instanceof Error ? e.message : 'Failed to add member');
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2> {memberToEdit ? 'Edit Member' : 'Add Member'} </h2>

        {error && <div className="error-message">{error}</div>}
        
        <form action={(formData) => {
          startTransition(() => handleFormAction(formData));
        }}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              placeholder="First Name" 
              defaultValue={memberToEdit?.firstName || ''}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Last Name" 
              defaultValue={memberToEdit?.lastName || ''}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              defaultValue={memberToEdit?.email || ''}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Phone" 
              defaultValue={memberToEdit?.phone || ''}
            />
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isPending}
            >
              {isPending
                ? memberToEdit ? "Saving..." : "Adding..."
                : memberToEdit ? "Save Changes" : "Add Member"}   </button>
          </div>
        </form>
      </div>
    </div>
  )
}