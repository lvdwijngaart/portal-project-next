import { SeasonDropdownOption } from "@/types/season";
import { on } from "events";


interface SeasonSelectorProps {
  seasons: Array<SeasonDropdownOption>;
  selectedSeason: SeasonDropdownOption | null;
  onSeasonSelect: (season: SeasonDropdownOption) => void;
}

export default function SeasonSelector({ seasons, selectedSeason, onSeasonSelect }: SeasonSelectorProps) {

  // If no seasons are provided, show a message indicating no seasons are available
  if (!seasons || seasons.length === 0) {
    return (
      <div className="flex items-center gap-4 my-6">
        <span className="font-medium text-gray-700 whitespace-nowrap">
          Season:
        </span>
        <span className="text-gray-500">No seasons available</span>
      </div>
    );
  }

  // Handle change in season dropdown
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = seasons.find(season => season.id === selectedId);
    if (selected) {
      onSeasonSelect(selected);
    }
  };

  return (
    <div className="flex items-center gap-4 my-6 ">
      <label htmlFor="season-select" className="font-medium text-gray-700 whitespace-nowrap">
        Season:
      </label>
      <div className="relative min-w-[200px]">
        <select 
          id="season-select" 
          className="w-full px-4 py-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          defaultValue={selectedSeason ? selectedSeason.id : ""}
          onChange={handleSeasonChange}
        >
          {/* A placeholder for if no Season is set */}
          {!selectedSeason && (
            <option value="" disabled>
              Select a season
            </option>
          )}

          {/*  */}
          {seasons.map((season) => (
            <option 
              key={season.id} 
              value={season.id} 
            >
              {season.name} {season.active ? "(Active)" : ""}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}