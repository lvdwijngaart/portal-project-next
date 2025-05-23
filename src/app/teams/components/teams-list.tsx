"use client";

import { useState } from 'react';
import { TeamDetails } from './team-details';

import '../styles/teams-list.css'; 
import { Team } from '../../../features/teams/types/Team';
import { teamDummyData } from '@/features/teams/types/TeamDummyData';

/**
 * TeamsList component
 * This component displays a list of teams. 
 * Each list item is a {@link TeamListItem} component. Each team can be clicked to view its details in a sliding panel.
 * 
 * @returns JSX element representing the list of teams.
 */
export default function TeamsList() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Mock data - replace with actual data fetching
  const teams: Team[] = teamDummyData;

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
export function TeamListItem({ team, onClick }: { team: Team; onClick: () => void }) {
  return (
    <div 
      className='team-list-card'
      onClick={onClick}
    >
      <h1>{team.name}</h1>
      <p>{team.theme}</p>
      <p>{team.memberIds} members</p>
    </div>
  );
}