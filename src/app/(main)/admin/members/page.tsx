"use client";

import { Member } from "@prisma/client";
import MembersList from "@/features/members/admin/components/members-list";
import { use, useEffect, useState } from "react";
import MembersToolbar from "@/features/members/admin/components/members-toolbar";
import { getMembers } from "@/features/members/services/membersService";
import AddMemberModal from "@/features/members/admin/components/add-modal";
import ImportMemberModal from "@/features/members/admin/components/import-modal";


/**
 * AdminMembersPage component
 * 
 * This page is responsible for member administration and management. 
 * It should allow the admin to: 
 * * Member management:
 * * * View a list of all members
 * * * Add/Edit/Delete members
 * * * View member details
 * * * Assign/Remove members to/from teams	
 * * * Assign/Remove members to/from committees
 * * * Assign a role to a member
 * * Settings:
 * * * Manage member settings (e.g., fields, default values, etc.)
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
  const [isImportOpen, setImportOpen] = useState(false);

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

  // When the Add Member modal is opened in the toolbar, set the state to open
  function openAddModal() {
    setAddOpen(true);
  }

  // When the Import Member modal is opened in the toolbar, set the state to open
  function openImportModal() {
    setImportOpen(true);
  }

  // When the export button is clicked, for now log the action
  function handleExport() {
    console.log("Export Members");
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
          onAdd={openAddModal}
          onImport={openImportModal}
          onExport={handleExport}
          onFilter={() => console.log("Edit Members")}
        />
      </div>
      <MembersList members={members} isLoading={isLoading}/>
      {isAddOpen && (
        <AddMemberModal 
          isOpen={isAddOpen} 
          onClose={() => setAddOpen(false)} // Close the modal
          onSubmit={(newMember) => setMembers(prev => [...prev, newMember])}  // Add new member to the list of members being displayed
        />
      )}
      {isImportOpen && (
        <ImportMemberModal isOpen={isImportOpen} onClose={() => setImportOpen(false)} />
      )}
    </div>
  );
}