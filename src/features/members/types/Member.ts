
/**
 * Represents a member of the organization with personal and membership details.
 *
 * @property id - Unique identifier for the member.
 * @property firstName - The member's first name.
 * @property lastName - The member's last name.
 * @property email - The member's email address.
 * @property phone - (Optional) The member's phone number.
 * @property address - (Optional) The member's address.
 * @property birthDate - (Optional) The member's date of birth in ISO format.
 * @property memberSince - (Optional) The date the member joined, in ISO format.
 * @property memberType - (Optional) The type of membership: "member", "reunion", "trainer", or "guest".
 */
export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  birthDate?: Date
  memberSince?: string
  memberType?: "member" | "reunion" | "trainer" | "guest"
}

/**
 * Utility functions for working with Member objects.
 */
export namespace Member {
  
  /**
   * Returns the full name of the member by concatenating first and last names.
   *
   * @param member - The member object.
   * @returns The full name of the member.
   */
  export function getFullName(member: Member): string {
    return `${member.firstName} ${member.lastName}`;
  }

  /**
   * Admin-specific functions or properties can be added here.
   */
  export namespace Admin {
    // CHANGE THIS: Add admin-specific properties or methods here
    export function getAdminDetails(member: Member): string {
      return `Admin: ${getFullName(member)}`;
    }
  }
  
}