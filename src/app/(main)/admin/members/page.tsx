"use client";

import { Member } from "@prisma/client";
import { useEffect, useState } from "react";

import MembersList from "@/features/members/admin/components/members-list";
import MembersToolbar from "@/features/members/admin/components/members-toolbar";
import AddMemberModal from "@/features/members/admin/components/add-modal";
import ImportMemberModal from "@/features/members/admin/components/import-modal";
import DeleteMemberModal from "@/features/members/admin/components/delete-modal";

import { deleteMember, getMembers } from "@/features/members/services/membersService";

/**
 * AdminMembersPage component
 * 
 * This page is responsible for member administration and management. 
 * It should allow the admin to: 
 * * Member management:
 * * * View a list of all members
 * * * Add/Edit/Delete members
 * * * View member details @todo
 * * * Assign/Remove members to/from teams	@todo
 * * * Assign/Remove members to/from committees @todo
 * * * Assign a role to a member @todo
 * * Settings:
 * * * Manage member settings (e.g., fields, default values, etc.) @todo
 * @todo Devise more detailed requirements for this page.
 * 
 * @returns JSX element representing the admin members page.
 */
export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isAddOpen, setAddOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isImportOpen, setImportOpen] = useState(false);
  const [isExportOpen, setExportOpen] = useState(false);

  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  // Fetch members from the server when the component mounts
  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  // Handle the submission of the Add/Edit form
  function handleAddEditSubmit(newMember: Member) {
    // If editing, update the member in the list
    if (memberToEdit) {
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === newMember.id ? newMember : member
        )
      );
    } else {
      // If adding, append the new member to the list
      setMembers((prevMembers) => [...prevMembers, newMember]);
    }
  }

  // Handle the deletion of a member upon confirmation
  function handleDelete() {
    if (memberToDelete) {
      deleteMember(memberToDelete.id);    // Call the delete (from db) function from the service
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberToDelete.id)
      );
      setDeleteOpen(false);
    }
  }

  // Handle error state. Errors can occur during data fetching
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="admin-page members-page">
      <div className="admin-header">
        {/* Tab component */}
        <MembersToolbar 
          search="test"
          onSearchChange={(search) => console.log(search)}
          onAdd={() => {
            setMemberToEdit(null);        // Adding a new member, so don't set memberToEdit
            setAddOpen(true);             // Open the add/edit modal
          }}
          onImport={() => setImportOpen(true)}                  // Open the import modal
          onExport={() => setExportOpen(true)}
          onFilter={() => console.log("Edit Members")}
        />
      </div>

      <MembersList 
        members={members} 
        isLoading={isLoading} 
        onEdit={(member) => {            
          setMemberToEdit(member);          // Set the member to edit
          setAddOpen(true);                 // Open the add/edit modal
        }} 
        onDelete={(member) => {
          setMemberToDelete(member);        // Set the member to delete
          setDeleteOpen(true);              // Open the delete modal
        }}
      />

      {isAddOpen && (
        <AddMemberModal 
          isOpen={isAddOpen} 
          onClose={() => setAddOpen(false)}     // Close the modal
          onSubmit={handleAddEditSubmit}        // Handle the submission of the form
          memberToEdit={memberToEdit}           // Pass the member to edit
        />
      )}
      {isImportOpen && (
        <ImportMemberModal isOpen={isImportOpen} onClose={() => setImportOpen(false)} />
      )}
      {isDeleteOpen && memberToDelete && (
        <DeleteMemberModal isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} onDelete={handleDelete} member={memberToDelete} />
      )}
    </div>
  );
}