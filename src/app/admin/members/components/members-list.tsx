import { Member } from "@/features/members/types/Member";
import { useState } from "react";


type MembersListProps = {
  members: Member[];
};

export default function MembersList({ members }: MembersListProps) {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Members List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{`${member.firstName} ${member.lastName}`}</td>
                <td className="px-4 py-2 border-b">{member.email}</td>
                <td className="px-4 py-2 border-b">{member.phone}</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline ml-2">Delete</button>
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