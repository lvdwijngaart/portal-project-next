"use client";

import { auth } from "@/features/auth/services/auth";
import { LoginForm } from "@/app/login/components/login-form";
import Image from "next/image";
import TeamsList from "./components/teams-list";

import "./styles/page.css";

/**
 * TeamsPage component
 * This component serves as the main page for displaying teams. It includes a header and a list of teams.
 * 
 * @returns JSX element representing the Teams page.
 */
export default function TeamsPage() {

  return (
    <div className="teams-page">
      <div className="members-header">
        <div className='members-header-left'>
          <h1>Teams</h1>
        </div>
        <div className='members-header-right'>
          <button>{'<'} Filters</button>
        </div>
      </div>
      <p></p>
      <TeamsList />
    </div>
  );
}

