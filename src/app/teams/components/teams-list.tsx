"use client";

import { useState } from 'react';
import { TeamDetails } from './team-details';

import '../styles/teams-list.css'; 

/**
 * TeamsList component
 * This component displays a list of teams. 
 * Each list item is a {@link TeamListItem} component. Each team can be clicked to view its details in a sliding panel.
 * 
 * @returns JSX element representing the list of teams.
 */
export default function TeamsList() {
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);

  // Mock data - replace with actual data fetching
  const teams = [
    { id: 1, name: "Ladies 1", description: "Product development team", members: [{ name: "Lauren" }, { name: "Rugile" }] },
    { id: 2, name: "Gents 1", description: "Brand and growth team", members: [{ name: "Kyran" }, { name: "Stan" }, { name: "Ian" }] },
  ];

  return (
    <div className="relative">
      <div className="table-container">
        {teams.map(team => (
          <TeamListItem 
            key={team.id} 
            team={team} 
            onClick={() => setSelectedTeam(team)} 
          />
        ))}
      </div>

      {/* Team details overlay */}
      {selectedTeam && (
        <TeamDetails 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
}

/**
 * TeamListItem component
 * This component represents a single team in the {@link TeamsList}. 
 * It should display: @todo
 * * Team name
 * * Team theme
 * * Number of members	
 * 
 * @param team - The team object containing details to be displayed. 
 * @param onClick - Function to handle click event on the team item.
 * @returns JSX element representing a single team item.
 */	
export function TeamListItem({ team, onClick }: { team: any; onClick: () => void }) {
  return (
    <div 
      className='team-list-card'
      onClick={onClick}
    >
      <h1>{team.name}</h1>
      <p>{team.description}</p>
      <p>{team.members.length} members</p>
    </div>
  );
}