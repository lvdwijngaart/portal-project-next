import { SeasonDropdownOption } from "@/types/season";


interface SeasonSelectorProps {
  seasons: Array<SeasonDropdownOption>;
  onSeasonSelect: (seasonId: string) => void;
}

export default function SeasonSelector({ seasons, onSeasonSelect }: SeasonSelectorProps) {

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

  return (
    <div className="flex items-center gap-4 my-6 ">
      <label htmlFor="season-select" className="font-medium text-gray-700 whitespace-nowrap">
        Season:
      </label>
      <div className="relative min-w-[200px]">
        <select 
          id="season-select" 
          className="w-full px-4 py-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.name}
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