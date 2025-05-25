// import { Member } from "@prisma/client";
import { Member } from "@prisma/client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InformationPanel from "./information-panel";
import CommitteeHistoryPanel from "./committee-history-panel";
import MemberDetailsPageHeader from "./header";
import TabBar from "./tab-bar";
import TeamHistoryPanel from "./team-history";
import { getMemberCurrentTeam } from "../../services/memberRelationsService";

import "../../styles/member-detail.css"; 

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

  if (!member) {
    return null;
  }

  const initialTab = tabs[0];
  const [active, setActive] = useState(initialTab ?? tabs[0]);

  // const currentCommittees = await getMemberCurrentCommittees(member.id);
  // const committeeHistory = await getMemberCommitteeHistory(member.id);
  const [currentTeam, setCurrentTeam] = useState<{id: string, name: string} | null>(null);
  const [teamHistory, setTeamHistory] = useState<{ team: {id: string, name: string}, season: {id: string, name: string}}[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect that fetches more data about the member
  // such as current team, team history, current committees, committee history, etc.
  useEffect(() => {
    if (!member) return;
    setLoading(true);
    Promise.all([         // Fetch data through API
      fetch(`/api/members/${member.id}/current-team`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch current team");
        }
        return res.json();
      }),
      fetch(`/api/members/${member.id}/team-history`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch team history");
        }
        return res.json();
      }),
    ])
    .then(([team, teamHistory]) => {
      console.log("teamHistory:", teamHistory);
      setCurrentTeam(team);
      setTeamHistory(teamHistory || []);
    })
    .catch((error) => {
      console.error("Error fetching member data:", error);
    })
    .finally(() => {
      setLoading(false); // Set loading to false after fetching data
    });
  }, [member.id]);

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
        <div className={`scrollable-content`}>
          <div className="fade-top" />
          <div className="p-6 m-6 border border-gray-200 rounded-lg bg-white shadow-md">
            
            {active == tabs[0] && <InformationPanel member={member} teamData={currentTeam} isLoading={loading}/>}
            {active == tabs[1] && <TeamHistoryPanel teamHistory={teamHistory} isLoading={loading} />}
            {active == tabs[2] && <CommitteeHistoryPanel />}
            
          </div>
          <div className="fade-bottom" />
        </div>
      </div>
    </>
  );
}