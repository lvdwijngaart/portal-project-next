"use client";

import { Member } from "@/features/members/types/Member";
import MembersList from "@/features/members/admin/components/members-list";
import { use, useEffect, useState } from "react";
import MembersToolbar from "@/features/members/admin/components/members-toolbar";
import { getMembers } from "@/features/members/services/membersService";
import AddMemberModal from "@/features/members/admin/components/add-modal";


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

  const [isAddOpen, setAddOpen] = useState(false);

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

  function handleAddMember() {
    setAddOpen(true);
  }

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
          onAdd={handleAddMember}
          onImport={() => console.log("Import Members")}
          onExport={() => console.log("Export Members")}
          onFilter={() => console.log("Edit Members")}
        />
      </div>
      <MembersList members={members} isLoading={isLoading}/>
      {isAddOpen && (
        <AddMemberModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} />
      )}
    </div>
  );
}