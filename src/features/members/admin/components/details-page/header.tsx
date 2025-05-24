
import { Member } from "@prisma/client";
import Image from "next/image";


export default function MemberDetailsPageHeader({
  onClose,
  member,
}: {
  onClose: () => void;
  member: Member;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Image 
          src="https://randomuser.me/api/portraits/men/32.jpg"
          width={64} height={64} 
          alt={`${member.firstName} ${member.lastName}`} 
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-bold">{member.firstName} {member.lastName}&apos;s Details</h2>
            <p className="text-gray-400">ID: {member.id}</p>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        {/* 'X' or Cross svg */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}