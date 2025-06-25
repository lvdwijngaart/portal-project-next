import { parseStringPromise } from 'xml2js';
import { NextRequest, NextResponse } from 'next/server';
import { NevoboRawResponse, NevoboRawStanding, StandingEntry, StandingsResponse } from '@/types/nevobo';

/**
 * Retrieves the standings for a specific poule from the Nevobo API. 
 * 
 * @param request includes query parameters:
 * - region: The region of the poule.
 * - poule_id: The ID of the poule to fetch standings for.
 * @returns JSON response containing standings data or an error message.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const poule_id = searchParams.get('poule_id');
  const region = searchParams.get('region');

  if (!poule_id || !region ) {
    return NextResponse.json(
      { error: 'Missing required query parameters: poule_id, region, competition' },
      { status: 400 }
    );
  }

  const url = `https://api.nevobo.nl/export/poule/${region}/${poule_id}/stand.rss`;
  console.log('Fetching Nevobo standings from:', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Nevobo API responded with status: ${response.status}`);
    }
    
    const xml = await response.text();
    const json = await parseStringPromise(xml, { explicitArray: false }) as NevoboRawResponse;
    
    // Validate and transform the response
    const standingsResponse = transformNevoboResponse(json);
    
    return NextResponse.json(standingsResponse);
  } catch (error) {
    console.error('Failed to fetch Nevobo standings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse standings data' },
      { status: 500 }
    );
  }
}

function transformNevoboResponse(rawResponse: NevoboRawResponse): StandingsResponse {
  try {
    const channel = rawResponse.rss?.channel;
    
    if (!channel) {
      throw new Error('Invalid response structure: missing channel');
    }

    // Handle both single item and array cases
    const rawStandings = Array.isArray(channel['stand:ranking']) 
      ? channel['stand:ranking'] 
      : [channel['stand:ranking']];

    if (!rawStandings || rawStandings.length === 0) {
      throw new Error('No standings data found');
    }

    const standings: StandingEntry[] = rawStandings
      .filter(Boolean) // Remove any null/undefined entries
      .map((standing: NevoboRawStanding, index: number) => {
        // Validate required fields
        if (!standing['stand:team']?._ || !standing['stand:team']?.$?.id) {
          console.warn(`Invalid team data at index ${index}:`, standing);
          return null;
        }

        return {
          position: parseInt(standing['stand:nummer']) || index + 1,
          team: {
            id: standing['stand:team'].$.id,
            name: standing['stand:team']._,
          },
          matches: parseInt(standing['stand:wedstrijden']) || 0,
          points: parseInt(standing['stand:punten']) || 0,
          setsFor: parseInt(standing['stand:setsvoor']) || 0,
          setsAgainst: parseInt(standing['stand:setstegen']) || 0,
          pointsFor: parseInt(standing['stand:puntenvoor']) || 0,
          pointsAgainst: parseInt(standing['stand:puntentegen']) || 0,
        };
      })
      .filter(Boolean) as StandingEntry[]; // Remove null entries

    return {
      standings,
      metadata: {
        title: channel.title || 'Unknown Competition',
        lastUpdated: channel.lastBuildDate || new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Error transforming Nevobo response:', error);
    throw new Error('Failed to parse standings data');
  }
}