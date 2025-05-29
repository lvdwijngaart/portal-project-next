import { Member } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";
import { useEffect, useState } from "react";

import "../../styles/member-detail.css";
import Link from "next/link";
import { set } from "zod/v4";

interface ActivityPanelProps {
  member: Member;
}

interface ActivitySignup {
  activity: {
    id: string;
    name: string;
    date: Date;
    deadlineSignup: Date; 
    price: number;
    committeeId: string;
    committeeName: string;
  },
  signupDetails: {
    canceledAt: Date | null; 
    signupAt: Date; 
    paymentStatus: "pending" | "paid" | "refunded";
    paymentAt: Date | null;
  },
}

export default function ActivityPanel({
  member,
}: ActivityPanelProps) {

  const [activity, setActivity] = useState<ActivitySignup[]>([]);
  const [splitActivities, setSplitActivities] = useState<{upcoming: ActivitySignup[], past: ActivitySignup[]}>({past: [], upcoming: []});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/members/${member.id}/activity-signups`);
        if (!res.ok) throw new Error("Failed to fetch activity");
        const data = await res.json();
        console.log("Fetched activity data:", data);
        const upcomingAndPast = upcomingAndPastActivities(data);
        // Ensure data is always an array
        if (isMounted) {
          setActivity(data || []);
          setSplitActivities( upcomingAndPast || { upcoming: [], past: [] });
        }
      } catch {
        if (isMounted) {
          setActivity([]);
          setSplitActivities({ upcoming: [], past: [] });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchActivity();
    return () => {
      isMounted = false; // Set loading to false when component unmounts
    };
  }, [member.id]);

  function upcomingAndPastActivities(activity: ActivitySignup[]) {
    const now = new Date();
    const upcoming = activity.filter((signup) => new Date(signup.activity.date) >= now);
    const past = activity.filter((signup) => new Date(signup.activity.date) < now);
    return { upcoming, past };
  }

  return (
    <div className="activity-panel">
      <h1 className="text-xl font-bold mb-4">{member.firstName} {member.lastName}&apos;s signups</h1>


      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className="text-md font-semibold mb-4">Upcoming activities</h3>
          {splitActivities.upcoming.length === 0 
            ? (
              <p className="text-gray-500 mb-6">No upcoming activities.</p>
            ) : (
              <ul className=" records-list activity-content">
                {splitActivities.upcoming.map((signup: ActivitySignup) => (
                  <ActivityItem key={signup.activity.id} signup={signup} />
                ))}
            </ul>
            ) 
          }
          
          <h3 className="text-md font-semibold mb-4">Past activities</h3>
          {splitActivities.past.length === 0 
            ? (
              <p className="text-gray-500">No past activities.</p>
            ) : (
              <ul className="records-list activity-content">
                {splitActivities.past.map((signup: ActivitySignup) => (
                  <ActivityItem key={signup.activity.id} signup={signup} />
                ))}
            </ul>
            )
          }
          
        </div>
      )}
    </div>
  );
}

/**
 * 
 * @param param0 
 * @returns 
 */
const ActivityItem = ({
  signup,
}: {
  signup: ActivitySignup;
}) => (
  <li className="record-item-activity">
    <h2 className="font-weight-700">{signup.activity.name}</h2>
    <div className="record-info">
      <div className="signup-date">Signed up: {new Date(signup.signupDetails.signupAt).toLocaleDateString()}</div>
      <div className="cancel-date">
        Canceled at: {signup.signupDetails.canceledAt
          ? `${new Date(signup.signupDetails.canceledAt).toLocaleDateString()}`
          : `-`  
        }
      </div>
    </div>
    <div className="record-mid rounded-full bg-gray-200 w-auto px-4 py-2 hover:cursor-pointer hover:bg-gray-300">
      <Link href={"/activities"} className="record-client">{signup.activity.committeeName}</Link>
    </div>
    <div className="record-price">
      <span className="label">Price</span>
      <span className="value">€{Number(signup.activity.price).toFixed(2)}</span>
    </div>
    <button className="btn-action">Generate invoice</button>
  </li>
);