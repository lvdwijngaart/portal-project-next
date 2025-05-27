import { capitalize } from "@/lib/helperFunctions";
import { Member } from "@prisma/client";
import Image from "next/image";

interface InformationPanelProps {
  member: Member,
  teamData?: { 
    id: string; 
    name: string 
  } | null, 
  committeeData?: { 
    committee: {
      id: string;
      name: string;
    }, 
    season: {
      id: string;
      name: string;
      active: boolean;
    }
  }[] | null,
  isLoading?: boolean;
}

/**
 * InformationPanel component displays detailed information about a member.
 * 
 * It includes the member's personal details, team affiliation, current committees and contact information.
 * It is designed to be used in the context of a member's detail page, providing a comprehensive overview of the member's profile.
 * 
 * @param member - The member object containing personal details.
 * @param teamData - Optional team data object containing the current team id and name. 
 * @returns JSX.Element
 */
export default function InformationPanel({ member, teamData, committeeData, isLoading }: InformationPanelProps) {
  

  return (
    <div className="information-panel">

      {/* Header - Name, memberSince, edit button */}
      <div className="hero mb-6">
        <div>
          <h1 className="text-lg font-bold">{member.firstName} {member.lastName}</h1>
          <p>{capitalize(member.memberType)} since {member.memberSince.toDateString()}</p>
        </div>
        <button>
          Edit Member
        </button>
      </div>

      {/* Member Information */}
      <h2 className="text-lg font-bold mb-4">Member Information</h2>
      <div className="member-details mb-6">
        {/* Placeholder for member details */}
        <div className="detail-item">
          <span className="detail-label">Full Name:</span>
          <span className="detail-value">{member.firstName} {member.lastName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{member?.address ?? '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Birthday:</span>
          <span className="detail-value">{member.birthDate?.toDateString() ?? '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Study:</span>
          <span className="detail-value">{member.study ?? '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Field Position:</span>
          <span className="detail-value">{member.fieldPosition || "N/A"}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Shirt Number:</span>
          <span className="detail-value">{member.shirtNumber || "N/A"}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Member Type:</span>
          <span className="detail-value">{capitalize(member.memberType)} since {member.memberSince.toDateString()} </span>
        </div>
      </div>

      {/* Team Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Team</h2>
        {isLoading
          ? (<span>Loading team information...</span>)
          : (
          <span className="text-black-600 rounded-full py-2 px-5 bg-gray-200 inline-block">
            {teamData?.name
            ? `${teamData.name}`
            : "Not assigned to any team"}
          </span>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Committees</h2>
        {isLoading                                              // If loading, show a loading message
          ? (<span>Loading committee information...</span>)
          : committeeData && committeeData.length > 0           // If there are committees, map through them
            ? committeeData.map((committee) => (
              <span key={committee.committee.id} className="text-black-600 rounded-full py-2 px-5 bg-gray-200 inline-block mr-2 mb-2">
              {committee.committee.name}
                </span>
            )): (                                               // If no committees, show a message
              <span className="text-gray-500">No committees assigned</span>
            )
        }
      </div>

      {/* <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Committees</h2>
        <span className="text-gray-500">
          {member?.committees && member.committees.length > 0
            ? member.committees.map((committee) => committee.name).join(", ")
            : "No committees assigned"}
        </span>
      </div> */}

      {/* Contact Information */}
      <div className="contact-info">
        <h2 className="text-lg font-bold mb-2">Contact Information</h2>
        <div className="contact-det-container">
          <Image src="/mail-icon.png" alt="Email" width={24} height={24} className="contact-icon w-4 h-4 inline-block mr-2" />
          <div className="contact-content">
            <div className="contact-detail-title">
              Email address
            </div>
            <div className="contact-detail-value">
              {member.email}
            </div>
          </div>
        </div>
        {member?.phone && (
          <div className="contact-det-container">
            <Image src="/phone-icon.png" alt="Phone" width={24} height={24} className="contact-icon w-4 h-4 inline-block mr-2" />
            <div className="contact-content">
              <div className="contact-detail-title">
                Phone number
              </div>
              <div className="contact-detail-value">
                {member.phone}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

