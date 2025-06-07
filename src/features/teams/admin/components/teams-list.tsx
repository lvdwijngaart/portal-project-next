
import Link from 'next/link';
import { Team } from '@prisma/client';
import { TeamListItem } from '@/types/team';

import styles from '../styles/teams-list.module.css';

interface AdminTeamsListProps {
  teams: Array<TeamListItem>;
  selectedTeamId: string | null; 
  onTeamSelect: (teamId: string) => void;
}

export default function AdminTeamsList({teams, selectedTeamId, onTeamSelect}: AdminTeamsListProps) {


  return (
    <div className={`${styles.adminTeamsList}`}>
      <ul>
        {teams.map((team) => (
          
          <li key={team.teamId} className={`${styles.teamItem} ${selectedTeamId == team.teamSeasonId ? `${styles.selectedTeam}` : ""}`} onClick={() => onTeamSelect(team.teamSeasonId)}>
            {/* Example team item with edit and delete buttons */}	
            <span className="team-name">{team.name}</span><span>&gt;</span>
            {/* <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button> */}
          </li>
        ))}
      </ul>
      {/* Add your content here */}
    </div>
  );
}