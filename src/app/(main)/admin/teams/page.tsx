"use client";

import SeasonSelector from "@/features/teams/admin/components/season-selector";
import TeamsTabBar from "@/features/teams/admin/components/tabbar";
import TeamDetailsPage from "@/features/teams/admin/components/team-details";
import AdminTeamsList from "@/features/teams/admin/components/teams-list";
import { TeamListItem } from "@/types/team";
import Link from "next/link";
import { useEffect, useState } from "react";

import adminStyles from "../admin-styles.module.css"; 
import styles from './teams.module.css';
import { SeasonDropdownOption } from "@/types/season";


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
  const [loading, setLoading] = useState<boolean>(true);

  const [allSeasons, setAllSeasons] = useState<SeasonDropdownOption[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<SeasonDropdownOption | null>(null);
  
  const [allTeams, setAllTeams] = useState<TeamListItem[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Fetch teams data from the server when the component mounts
  useEffect(() => {
    async function fetchSeasons() {
      try {
        const response = await fetch('/api/seasons');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAllSeasons(data || []);

        const activeSeason = data.find((season: SeasonDropdownOption) => season.active);
        if (activeSeason) {
          setSelectedSeason(activeSeason);
        } else if (data.length > 0) {
          setSelectedSeason(data[0]); // Fallback to the first season if no active one is found
        }
      } catch(error) {
        console.error("Failed to fetch seasons:", error);
        // Handle error appropriately, e.g., show a notification
      } finally {
        setLoading(false); // If you had a loading state
      }
    }
    fetchSeasons();
  }, []);

  // Fetch teams when the selected season changes
  useEffect(() => {
    async function fetchTeams() {
      if (!selectedSeason) return;
      
      setLoading(true); // Set loading state while fetching teams
      try {
        const response = await fetch('/api/teams?seasonId=' + (selectedSeason.id));

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
  }, [selectedSeason]);

  // This constant is filtered based on the active tab, and changes when the active tab is changed.
  const currentTeams = allTeams.filter(team => {
    if (activeTab === "mens") {
      return team.teamCategory === "Gents";
    } else {
      return team.teamCategory === "Ladies";
    }
  });

  // This function is called when the category tab is changed. It is passed to the TeamsTabBar component.
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
      <SeasonSelector
        seasons={allSeasons}
        selectedSeason={selectedSeason}
        onSeasonSelect={(season) => {
          setSelectedSeason(season);
          setSelectedTeamId(null);
        }}
      />

      {/* Content Container */}
      <div className={`${styles.contentContainer}`}>

        {loading ? (
          // Loading state
          <div className={`${styles.loadingContainer}`}>
            Loading teams...
          </div>
        ) : (
          <>
            {currentTeams.length === 0 ? (
              // No teams found message
              <div className={`${styles.teamListContainer} items-center justify-center`}>
                <p className="text-gray-500 text-center">No teams found for the selected category and season.</p>
              </div>
            ) : (
              // List component 
              <div className={`${styles.teamListContainer}`}>
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
