import { useState, useEffect } from 'react';
import { Member } from '../types/Member';

/**
 * Custom hook to fetch members by their IDs
 * 
 * @param memberIds Array of member IDs to fetch
 * @returns Object containing members array, loading state, and error state
 */
export function useMembers(memberIds: string[]) {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Skip if no IDs provided
    if (!memberIds.length) {
      setMembers([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    
    async function fetchMembers() {
      try {
        // Replace with your actual API call
        const membersData = await Promise.all(
          memberIds.map(id => fetchMemberById(id))
        );
        
        // Only update state if component is still mounted
        if (isMounted) {
          setMembers(membersData.filter(Boolean) as Member[]);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch members'));
          setIsLoading(false);
        }
      }
    }

    fetchMembers();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [memberIds.join(',')]); // Use joined string to properly track array changes

  return { members, isLoading, error };
}

// Mock function - replace with your actual API call
async function fetchMemberById(id: string): Promise<Member | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would be an API call
  return {
    id,
    firstName: "John",
    lastName: "Doe",
    email: `${id}@example.com`
  } as Member;
}