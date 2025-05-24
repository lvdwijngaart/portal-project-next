import { capitalize } from "@/lib/helperFunctions";
import { Member } from "@prisma/client";
import Image from "next/image";



export default function InformationPanel({ member }: { member: Member }) {
  return (
    <div className="information-panel">
      <div className="hero mb-6">
        <div>
          <h1 className="text-lg font-bold">{member.firstName} {member.lastName}</h1>
          <p>{capitalize(member.memberType)} since {member.memberSince.toDateString()}</p>
        </div>
        <button>
          Edit Member
        </button>
      </div>

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

      <div className="contact-info">
        <h3 className="text-lg font-bold mb-2">Contact Information</h3>
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

