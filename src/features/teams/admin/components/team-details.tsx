import { useState, useEffect } from 'react';
import Image from 'next/image';

import { teamDetails } from '@/types/team';

import styles from "../styles/team-details.module.css"; // Adjust the path as necessary
import { StandingsResponse } from '@/types/nevobo';


interface TeamDetailsPageProps {
  teamId: string | null; // Make it required since component only renders when teamId exists
  onClose: () => void; // Add close handler
}

export default function TeamDetailsPage({ teamId, onClose }: TeamDetailsPageProps) {
  const [teamData, setTeamData] = useState<teamDetails | null>(null);
  const [standingsData, setStandingsData] = useState<StandingsResponse | null>(null); // Adjust type as needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    async function fetchTeamDetails() {
      if (!teamId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch team details
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', errorText);
          throw new Error(`Failed to fetch team details: ${errorText}`);
        }
        const data: teamDetails = await response.json();
        console.log('Fetched team data:', data);
        setTeamData(data);

        // parameters to fetch Nevobo standings
        const region = data.nevoboRegion;
        const pouleId = data.nevoboPouleId;

        // Fetch Nevobo standings with query parameters
        const nevoboResponse = await fetch(
          `/api/nevobo/standings?poule_id=${pouleId}&region=${region}&seizoen=2023`
        );
        if (!nevoboResponse.ok) {
          const nevoboErrorText = await nevoboResponse.text();
          console.error('Nevobo fetch error:', nevoboErrorText);
          // Optionally set a separate error state for standings
        } else {
          const standingsData = await nevoboResponse.json();
          setStandingsData(standingsData);
        }
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
  // useEffect(() => {
  //   function handleEscape(e: KeyboardEvent) {
  //     if (e.key === 'Escape') onClose();
  //   }
    
  //   document.addEventListener('keydown', handleEscape);
  //   return () => document.removeEventListener('keydown', handleEscape);
  // }, [onClose]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (showImageModal) {
          setShowImageModal(false);
        } else {
          onClose();
        }
      }
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, showImageModal]);
  
  return (
    <div className={`${styles.detailsContainer}`}>

      {/* If teamId is not set, show a placeholder div */}
      {teamId === null ? (
        <div className={`${styles.noContent}`} >
          No team selected
        </div>
      ) : (
        <div className='flex flex-col items-start justify-start z-60-panel p-4 h-full w-full'>
          <div className='w-full'>
            
            {loading && <p>Loading team details...</p>}
            
            {error && (
              <div className='text-red-500'>
                <p>Error: {error}</p>
                <button className='text-blue-500 hover:underline' onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}
            
            {teamData && !loading && (
              <div className='w-full'>
                <div className="flex flex-row w-full gap-6">

                  {/* Team details */}
                  <div className="flex-1 flex flex-col gap-2">

                    <div className='flex justify-between mb-2'>

                      <div className='flex flex-col w-full'>

                        <div className="header flex gap-6 items-center mb-4 w-full">
                          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
                            ×
                          </button>
                          <h2 className='text-lg font-semibold'>{teamData.team.name}&apos;s Team Details</h2>
                        </div>

                        <div className="mb-2">
                          <div className="text-sm text-gray-500">Theme</div>
                          <div className="font-medium">{teamData.theme ?? <span className="text-gray-400">No theme</span>}</div>
                        </div>
                        <div className="flex mb-2 w-full">
                          <div className="">
                            <div className="text-sm text-gray-500">Poule</div>
                            <div className="font-medium">{teamData.poule ?? <span className="text-gray-400">No poule</span>}</div>
                          </div>
                          <div className="flex-1 flex justify-center" style={{ minWidth: 0 }}>
                            <div>
                              <div className="text-sm text-gray-500">Region</div>
                              <div className="font-medium">{teamData.nevoboRegion ?? <span className="text-gray-400">No region</span>}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Team photo placeholder */}
                      <div className="flex-shrink-0  mr-4">
                        <div
                          className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl overflow-hidden"
                          style={{ border: '1px solid #846099' }} // Replace #3498db with your desired hex code
                          title="Team photo"
                          onClick={() => teamData.teamPhoto?.url && setShowImageModal(true)}
                        >
                          <Image
                          src={teamData.teamPhoto?.url || '/placeholder-team-photo.png'}
                          alt="Team Photo"
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    
                    </div>

                    <div className='flex justify-between gap-6 mr-6'>
                      {/* Standings Table Placeholder */}
                      <div className="flex-2 mb-2">
                      <div className="text-sm text-gray-500 mb-1">Standings</div>
                        <div className="border rounded bg-gray-50 p-2 text-center text-gray-400 text-sm">
                          {standingsData && standingsData.standings && standingsData.standings.length > 0 ? (
                            <table className="min-w-full text-xs text-left border-collapse">
                              <thead>
                                <tr>
                                  <th className="px-2 py-1 border-b font-semibold">#</th>
                                  <th className="px-2 py-1 border-b font-semibold">Team</th>
                                  <th className="px-2 py-1 border-b font-semibold">Played</th>
                                  <th className="px-2 py-1 border-b font-semibold">Points</th>
                                  <th className="px-2 py-1 border-b font-semibold">Sets won</th>
                                  <th className="px-2 py-1 border-b font-semibold">Sets lost</th>
                                </tr>
                              </thead>
                              <tbody>
                                {standingsData.standings.map((row, idx) => (
                                  <tr key={row.team.id || idx} className={row.team.name === teamData?.team.nevoboName ? "bg-blue-100 font-bold" : ""}>
                                    <td className="px-2 py-1 border-b">{row.position}</td>
                                    <td className="px-2 py-1 border-b">{row.team.name}</td>
                                    <td className="px-2 py-1 border-b">{row.matches}</td>
                                    <td className="px-2 py-1 border-b">{row.points}</td>
                                    <td className="px-2 py-1 border-b">{row.setsFor}</td>
                                    <td className="px-2 py-1 border-b">{row.setsAgainst}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <span className="text-gray-400">No standings available</span>
                          )}
                          {/* Standings table will appear here (placeholder) */}
                        </div>
                      </div>

                      {/* Players List */}
                      <div className="flex-1 mb-2">
                        {/* <div className="text-sm text-gray-500 mb-1">Players</div> */}
                        <table className={`${styles.playerListTable} min-w-full text-xs text-left border-collapse`}>
                          <thead>
                            <tr className=''>
                              <th className="font-semibold">Shirt #</th>
                              <th className="font-semibold">Name</th>
                              <th className="font-semibold">Position</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamData.members && teamData.members.length > 0 ? (
                              teamData.members.map((player, idx) => (
                                <tr key={player.id} className={player.isCaptain ? "bg-yellow-100 font-bold" : ""}>
                                  <td>{player.shirtNumber ?? "?"}</td>
                                  <td>{player.firstName} {player.lastName}</td>
                                  <td>{player.fieldPosition ?? "?"}</td>
                                </tr>
                              ))
                            ) : (
                              <tr className=''>
                                <td colSpan={3} className="py-1 text-gray-400 text-center">No players</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {/* <ul className='list-disc pl-5 text-sm text-gray-700'>
                          {teamData.members && teamData.members.length > 0 ? (
                            teamData.members.map(player => (
                              <li key={player.id} className='mb-1 border-b border-gray-200 pb-1'>
                                {player.firstName} {player.lastName} - {player.fieldPosition}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400">No players</li>
                          )}
                        </ul> */}
                      </div>
                      
                    </div>
                  </div>

                </div>
                
              </div>
            )}  

            {/* Image Modal */}
            {showImageModal && teamData?.teamPhoto?.url && (
                <div 
                className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-[9999] p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                onClick={() => setShowImageModal(false)}
                >
                <div 
                  className="relative max-w-4xl max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-75 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 z-10"
                  onClick={() => setShowImageModal(false)}
                  >
                  ×
                  </button>
                  
                  {/* Large image */}
                  <Image
                  src={teamData.teamPhoto.url}
                  alt={teamData.teamPhoto.caption || `${teamData.team.name} team photo`}
                  width={800}
                  height={600}
                  className="object-contain max-w-full max-h-full rounded-lg"
                  />
                  
                  {/* Caption */}
                  {teamData.teamPhoto.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                    <p className="text-center">{teamData.teamPhoto.caption}</p>
                  </div>
                  )}
                </div>
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