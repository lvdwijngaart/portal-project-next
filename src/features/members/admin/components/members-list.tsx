import { Member } from "@prisma/client";
import { useState } from "react";

import "../../styles/members-list.css"; 

type MembersListProps = {
  members: Member[];
  isLoading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
};

/**
 * MembersList component
 * 
 * This component holds 
 * Renders a list of members in a table format with options to add, import, export, edit, and delete members.
 *
 * @component
 * @param {MembersListProps} props - The props for the MembersList component.
 * @param {Array<Member>} props.members - An array of member objects to display in the list.
 *
 * @returns {JSX.Element} The rendered MembersList component.
 *
 * @example
 * <MembersList members={[{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890' }]} />
 */
export default function MembersList({ members, isLoading, onEdit, onDelete }: MembersListProps) {

  return (
    <div className="container">
      {/* Toolbar component */}

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="actionsHeader">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="loading">
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && members.length === 0 && (
              <tr>
                <td colSpan={4} className="noData">
                  No members found.
                </td>
              </tr>
            )}
            {members.map((member) => (
              <tr key={member.id}>
                <td>{`${member.firstName} ${member.lastName}`}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td className="actions">
                  <button className="edit" onClick={() => {onEdit(member)}}>Edit</button>
                  <button className="delete" onClick={() => {onDelete(member)}}>Delete</button>
                </td>
              </tr>
            ))}
            {/* Map through members data here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}