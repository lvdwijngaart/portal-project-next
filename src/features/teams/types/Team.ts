import { Member } from "@/features/members/types/Member"

/**
 * Represents a team of members.
 *
 * @property id - Unique identifier for the team.
 * @property name - Name of the team.
 * @property memberIds - Array of user IDs representing the members of the team.
 * @property theme - The theme associated with the team.
 * @property season - The season in which the team is active.
 * @property level - The competitive or skill level of the team.
 * @property trainingDays - List of days when the team has training sessions.
 * @property teamPhoto - URL or path to the team's photo.
 */
export interface Team {
  id: string
  name: string
  memberIds: string[] // Array of member IDs
  theme: string
  season: string
  level: string
  trainingDays: string[]
  teamPhoto: string
}

/**
 * Utility functions for working with Team objects.
 */
export namespace Team {
  
  // CHANGE THIS: Add utility functions or properties here

  /**
   * Admin-specific functions or properties can be added here.
   */
  export namespace Admin {
    // CHANGE THIS: Add admin-specific properties or methods here
    export function getAdminDetails(team: Team): string {
      return team.id;
    }
  }
}
