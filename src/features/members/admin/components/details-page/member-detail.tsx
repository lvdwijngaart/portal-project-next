// import { Member } from "@prisma/client";
import { Member } from "@prisma/client";

import "../../styles/member-detail.css"; 
import Image from "next/image";
import { useState } from "react";
import InformationPanel from "./information-panel";
import CommitteeHistoryPanel from "./committee-history-panel";
import MemberDetailsPageHeader from "./header";
import TabBar from "./tab-bar";

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

  // const onTabChange = (tab: string) => {
  //   console.log("Selected:", tab);
  //   // show/hide the corresponding panel...
  // };
  const initialTab = tabs[0];
  
  const [active, setActive] = useState(initialTab ?? tabs[0]);

  const onTabChange = (tab: string) => {
    setActive(tab);
    // onTabChange(tab);
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
      <div className="slide-panel">

        {/* Header */}
        <MemberDetailsPageHeader onClose={onClose} member={member} />

        {/* Tab Bar Component */}
        <TabBar tabs={tabs} activeTab={active} onTabChange={onTabChange} />
        
        {/* Content */}
        <div className="p-6 m-6 border border-gray-200 rounded-lg bg-white shadow-md">
          
          {active == tabs[0] && <InformationPanel member={member}/>}
          {active == tabs[1] && <div>Team History Content</div>}
          {active == tabs[2] && <CommitteeHistoryPanel />}
          
        </div>
      </div>
    </>
  );
}