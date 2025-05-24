// import { Member } from "@prisma/client";
import { Member } from "@prisma/client";

import "../../styles/member-detail.css"; 
import Image from "next/image";
import { useState } from "react";
import InformationPanel from "./information-panel";
import CommitteeHistoryPanel from "./committee-history-panel";

interface MemberDetailProps {
  onClose: () => void;
  member: Member;
}

/**
 * Displays detailed information about a specific member.
 *
 * This component renders a page that slides in from the right side of the screen.
 * On it, it should display the following: 
 * * Member's details (name, joinDate, shirtNumber, etc.)
 * * Member's profile picture
 * * Member's team
 * * Member's committees
 * * Member's role
 * * contact information
 * * Possibly late payments ?
 *
 * @returns {JSX.Element} The rendered member detail section.
 */
export default function MemberDetail({ onClose, member }: { onClose: () => void; member: Member }) {
  const tabs = [
    "Personal Information",
    "Team History",
    "Committees",
    "Activity",
    "Documents",
    "Settings",
  ];

  const onTabChange = (tab: string) => {
    console.log("Selected:", tab);
    // show/hide the corresponding panel...
  };
  const initialTab = tabs[0];
  
  const [active, setActive] = useState(initialTab ?? tabs[0]);

  const handleClick = (tab: string) => {
    setActive(tab);
    onTabChange(tab);
    // onSelect?.(tab);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 opacity-50 z-40`}
        onClick={onClose}
      />
      
      {/* Slide-in Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-2/3 max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Image 
              src="https://randomuser.me/api/portraits/men/32.jpg"
              width={64} height={64} 
              alt={`${member.firstName} ${member.lastName}`} 
              className="rounded-full border-2 border-gray-300"
            />
            <h2 className="text-xl font-bold">{member.firstName} {member.lastName}'s Details</h2>
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

        {/* Tab Bar Component */}
        <nav className="tab-bar">
          <ul className="tab-list">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`tab-item${tab === active ? " active" : ""}`}
                onClick={() => handleClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Content */}
        <div className="p-6">
          
          <div className="hero mb-6">
            <div>
              <h1 className="text-lg font-bold">{member.firstName} {member.lastName}</h1>
              <p>{member.memberType}</p>
            </div>
            <button>
              Edit Member
            </button>
          </div>

          {active == tabs[0] && <InformationPanel />}
          {active == tabs[1] && <div>Team History Content</div>}
          {active == tabs[2] && <CommitteeHistoryPanel />}
          
          <div>
            <h3 className="text-lg font-bold mb-2">Members</h3>
            <ul className="space-y-2">
              {/* {team.members.map((member: {name: string}, index: number) => (
                <li key={index} className="p-2 border rounded">
                  {member.name}
                </li>
              ))} */}
            </ul>
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
      </div>
    </>
  );
}