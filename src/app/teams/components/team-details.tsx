"use client";

import { useEffect, useState } from 'react';

// import './team-details.css'; // Import your CSS file for styles

/**
 * TeamDetails component
 * This component displays the details of a selected team in a sliding panel. It slides in from the right and is accessed by clicking on a team from the teamList.
 * It includes a backdrop that dims the rest of the screen and a close button to hide the panel.
 * 
 * @param team - The team object containing details to be displayed. 
 * @param onClose - Function to close the details panel.
 * @returns JSX element representing the team details panel.
 */
export function TeamDetails({ team, onClose }: { team: any; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle animation timing
  useEffect(() => {
    setIsVisible(true);
    // Add event listener for escape key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match this with CSS transition time
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Slide-in Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-2/3 max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{team.name} Details</h2>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {/* 'X' or Cross svg */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p>{team.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Members</h3>
            <ul className="space-y-2">
              {team.members.map((member: any, index: number) => (
                <li key={index} className="p-2 border rounded">
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}