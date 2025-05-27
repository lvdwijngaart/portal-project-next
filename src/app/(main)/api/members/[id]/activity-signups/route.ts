// app/api/members/[id]/activity-signups/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * API route to fetch the activity signups of a member. 
 * 
 * This route retrieves a (sorted) list of activities that this member has signed up for. 
 * The data includes: activity id, activity name, activity date, activity signup deadline and payment status
 * 
 * @param _req - The incoming request object (not used in this function).
 * @param params.id - The id of the member whose activity signups are requested.
 * @returns NextResponse - A JSON response containing the activity signups or null if no activity signups are found.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; // Await the promise to get the actual ID
  try {
    const rec = await prisma.activitySignup.findMany({
      where: {
        memberId: id, 
      },
      select: {
        activity: {
          select: {
            id: true, // Activity ID
            name: true, // Activity Name
            date: true, // Activity Date
            deadlineSignup: true, // Signup Deadline
            price: true, // Activity Price (if needed)
            committeeSeason: {
              select: {
                committee: {
                  select: { id: true, name: true }, // Committee ID and Name
                },
              }
            }
          },
        },
        paymentStatus: true, // Payment Status
        canceledAt: true, // Canceled At (if applicable)
        signupAt: true, // Signup At (when the member signed up)
        payment_at: true, // Payment At (if applicable)
      },
      orderBy: {
      activity: {
        date: 'desc', // Sort by activity date. 
      },
      },
    });
    
    // Only if there are such records, return the activity signups. Otherwise return null. 
    if (rec && rec.length > 0) {
      const activitySignups = rec.map(item => ({
      activity: {
        id: item.activity.id,
        name: item.activity.name,
        date: item.activity.date,
        deadlineSignup: item.activity.deadlineSignup,
        price: item.activity.price,
        committeeId: item.activity.committeeSeason.committee.id,
        committeeName: item.activity.committeeSeason.committee.name,
      },
      signupDetails: {
        canceledAt: item.canceledAt,
        signupAt: item.signupAt,
        paymentStatus: item.paymentStatus,
        paymentAt: item.payment_at,
      },
      }));
      return NextResponse.json(activitySignups);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error(`Failed to fetch signups for member ${id}:`, error);
    throw error;
  }
}