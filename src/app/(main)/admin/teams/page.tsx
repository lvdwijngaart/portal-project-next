"use client";

import SeasonSelector from "@/features/teams/admin/components/season-selector";
import TeamsTabBar from "@/features/teams/admin/components/tabbar";
import TeamDetailsPage from "@/features/teams/admin/components/team-details";
import AdminTeamsList from "@/features/teams/admin/components/teams-list";
import { TeamListItem } from "@/types/team";
import { Team } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

import adminStyles from "../admin-styles.module.css"; 
import styles from './teams.module.css';


/**
 * AdminTeamsPage component
 * 
 * This page is responsible for team and season management. 
 * It should allow the admin to: 
 * * Team management: 
 * * * View a list of all teams
 * * * Add/Edit/Delete teams
 * * * View team details
 * * * Assign/Remove members to/from team
 * * Season management:
 * * * View a list of all seasons
 * * * Add/Edit/Delete seasons
 * * * View season details  (?)
 * @todo Devise more detailed requirements for this page.
 * 
 * @returns JSX element representing the admin teams page.
 */
export default function AdminTeamsPage() {
  const tabs: ('mens' | 'womens')[] = ['mens', 'womens'];
  const [activeTab, setActiveTab] = useState<"mens" | "womens">("mens");
  const [allTeams, setAllTeams] = useState<TeamListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch teams data from the server when the component mounts
  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/api/teams');

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response and set the teams state
        const data = await response.json();
        setAllTeams(data || []);
      } catch(error) {
        console.error("Failed to fetch teams:", error);
        // Handle error appropriately, e.g., show a notification
      } finally {
        setLoading(false); // If you had a loading state
      }
    }

    fetchTeams();
  }, []);

  const currentTeams = allTeams.filter(team => {
    if (activeTab === "mens") {
      return team.teamCategory === "Gents";
    } else {
      return team.teamCategory === "Ladies";
    }
  });

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);


  function handleTabChange(tab: "mens" | "womens") {
    setActiveTab(tab);
    setSelectedTeamId(null); // Reset selected team when tab changes
  }


  return (
    <div className={`${styles.teamsPage}`}>
      {/* Header */}
      <div className={`${adminStyles.adminHeader} flex justify-between items-center`}>
        <h1>Admin Teams Page</h1> 
        <Link
          href='/admin/teams/config'
          className={`${styles.manageButton}`}
        >
          Manage Teams & Seasons <span className="font-bold ml-2">&gt;</span> 
        </Link>
      </div>

      {/* TeamCategory Tab Bar */}
      <TeamsTabBar tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Season selector */}
      <SeasonSelector seasons={[{id: "0", name: "2024-2025", active: true}, {id: "1", name: "2023-2024", active: false} ]} onSeasonSelect={() => {}} />

        <div className={`${styles.contentContainer}`}>

          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-500">Loading teams...</p>
            </div>
          ) : (
            <>
              {currentTeams.length === 0 ? (
                <div className={`${styles.teamListContainer} items-center mt-30`}>
                  <p className="text-gray-500">No teams found for the selected category and season.</p>
                </div>
              ) : (
                <div className={`${styles.teamListContainer}`}>
                  {/* List component */}
                  <AdminTeamsList teams={currentTeams} selectedTeamId={selectedTeamId} onTeamSelect={setSelectedTeamId}/>
                </div>
              )}
              <div className={`${styles.teamDetailsContainer}`}>
                {/* Team-Detail page that is only displayed when teamToView is set */}
                <TeamDetailsPage teamId={selectedTeamId} onClose={() => {setSelectedTeamId(null)}}/>
              </div>
            </>
          )}

          </div>
    </div>
  );
}