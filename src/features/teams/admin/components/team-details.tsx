import { useState, useEffect } from 'react';

import { teamDetails } from '@/types/team';

import styles from "../styles/team-details.module.css"; // Adjust the path as necessary


interface TeamDetailsPageProps {
  teamId: string | null; // Make it required since component only renders when teamId exists
  onClose: () => void; // Add close handler
}

export default function TeamDetailsPage({ teamId, onClose }: TeamDetailsPageProps) {
  const [teamData, setTeamData] = useState<teamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeamDetails() {
      if (!teamId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', errorText);
          throw new Error(`Failed to fetch team details: ${errorText}`);
        }
        
        const data = await response.json();
        setTeamData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching team details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamDetails();
  }, [teamId]); // Re-fetch if teamId changes

  // Close on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  return (
    <div className={`${styles.detailsContainer}  mx-10 `}>

      {/* If teamId is not set, show a placeholder div */}
      {teamId === null ? (
        <div className={`${styles.noContent}`} >
          No team selected
        </div>
      ) : (
        <div className='flex flex-col items-start justify-start z-60-panel p-4 h-full'>
          <div className='w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-xl font-semibold'>Team Details</h1>
              <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
                ×
              </button>
            </div>
            
            {loading && <p>Loading team details...</p>}
            
            {error && (
              <div className='text-red-500'>
                <p>Error: {error}</p>
                <button className='text-blue-500 hover:underline' onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}
            
            {teamData && !loading && (
              <div>
                <h2 className='text-lg font-semibold'>{teamData.name}</h2>
                
                {teamData.members && (
                  <div className='mt-4'>
                    <h3 className='text-md font-medium'>Members ({teamData.members.length})</h3>
                    <ul className='list-disc pl-5'>
                      {teamData.members.map(member => (
                        <li key={member.id}>{member.firstName}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}  
          </div>
        </div>
        // <div className='fixed inset-0 flex items-center justify-center z-60-panel'>
        //   <div className='bg-white p-4 rounded shadow-lg w-full max-w-md'>
        //     <div className='flex justify-between items-center mb-4'>
        //       <h1 className='text-xl font-semibold'>Team Details</h1>
        //       <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
        //         ×
        //       </button>
        //     </div>
            
        //     {loading && <p>Loading team details...</p>}
            
        //     {error && (
        //       <div className='text-red-500'>
        //         <p>Error: {error}</p>
        //         <button className='text-blue-500 hover:underline' onClick={() => window.location.reload()}>Retry</button>
        //       </div>
        //     )}
            
        //     {teamData && !loading && (
        //       <div>
        //         <h2 className='text-lg font-semibold'>{teamData.name}</h2>
                
        //         {teamData.members && (
        //           <div className='mt-4'>
        //             <h3 className='text-md font-medium'>Members ({teamData.members.length})</h3>
        //             <ul className='list-disc pl-5'>
        //               {teamData.members.map(member => (
        //                 <li key={member.id}>{member.firstName}</li>
        //               ))}
        //             </ul>
        //           </div>
        //         )}
        //       </div>
        //     )}  
        //   </div>
        // </div>
      )}
      {/* <div className='fixed inset-0 bg-black transition-opacity duration-300 opacity-40 z-60-panel' onClick={onClose}>
      </div> */}
      {/* <div className='' onClick={(e) => e.stopPropagation()}>
        <div className=''>
          <h1>Team Details</h1>
          <button className='' onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className=''>
          {loading && <p>Loading team details...</p>}
          
          {error && (
            <div className=''>
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
          {teamData && !loading && (
            <div>
              <h2>{teamData.name}</h2>
              
              {teamData.members && (
                <div>
                  <h3>Members ({teamData.members.length})</h3>
                  <ul>
                    {teamData.members.map(member => (
                      <li key={member.id}>{member.firstName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}