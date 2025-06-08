import { SeasonDropdownOption } from "@/types/season";
import { NextResponse } from "next/server";


export async function GET(_req: Request) {
  try {
    const seasons = await prisma?.season.findMany({
      select: {
        id: true, 
        name: true, 
        active: true,
      },
      orderBy: {
        name: 'desc',
      },
    });

    if (!seasons) {
      return NextResponse.json({
        error: "No seasons found"
      }, { status: 404 });
    }

    const formattedSeasons: SeasonDropdownOption[] = seasons.map(season => ({
      id: season.id,
      name: season.name,
      active: season.active,
    }));

    return NextResponse.json(formattedSeasons);
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  } 
}